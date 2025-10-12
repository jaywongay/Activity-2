// backend/src/authentication/authentication.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { EmailService } from './email.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    public emailService: EmailService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;
    
    // Check if username already exists
    const existingUsername = await this.usersService.findByUsername(username);
    if (existingUsername) {
      throw new BadRequestException('This username is already taken. Please choose a different username.');
    }
    
    // Check if email already exists
    const existingEmail = await this.usersService.findByEmail(email);
    if (existingEmail) {
      throw new BadRequestException('This email address is already registered. Please use a different email or try logging in.');
    }
    
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.usersService.create(username, email, hashedPassword);
  
      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      };
    } catch (error) {
      throw new BadRequestException('Unable to create account. Please try again later.');
    }
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    
    console.log('=== LOGIN ATTEMPT ===');
    console.log('Received username:', username);
    
    const user = await this.usersService.findByUsername(username);
    
    if (!user) {
      throw new UnauthorizedException('Username not found. Please check your username or create an account.');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('bcrypt.compare result:', isPasswordValid);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password. Please try again or use "Forgot Password" to reset it.');
    }
  
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }

  async validateUser(userId: number) {
    try {
      const user = await this.usersService.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      const { password, ...result } = user;
      return result;
    } catch (error) {
      throw new UnauthorizedException(`Validation failed: ${error.message}`);
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    const user = await this.usersService.findByEmail(email);
  
    if (!user) {
      // Return same message to prevent email enumeration attacks
      return {
        message: 'If an account with that email exists, a password reset link has been sent.',
      };
    }
  
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const expires = new Date(Date.now() + 3600000); // 1 hour
  
    // Save hashed token to database
    await this.usersService.setResetToken(email, hashedToken, expires);
  
    // ✅ SEND EMAIL - ITO YUNG KULANG MO!
    try {
      await this.emailService.sendPasswordResetEmail(email, resetToken);
      console.log('✅ Password reset email sent to:', email);
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      // Still return success message for security
    }
  
    return {
      message: 'If an account with that email exists, a password reset link has been sent.',
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, newPassword } = resetPasswordDto;
    
    // Hash the token to match what's stored in DB
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
    // Find user by reset token and check if it's not expired
    const user = await this.usersService.findByResetToken(hashedToken);
    
    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }
    
    // Update user's password and clear reset token
    await this.usersService.updatePassword(user.id, newPassword);
    
    return {
      message: 'Password has been reset successfully',
    };
  }

  async testEmailService(email: string) {
    console.log('Testing email service...');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASSWORD exists:', !!process.env.EMAIL_PASSWORD);
    console.log('EMAIL_PASSWORD length:', process.env.EMAIL_PASSWORD?.length);
    
    await this.emailService.sendPasswordResetEmail(email, 'test-token-123');
    return { message: 'Email sent successfully' };
  }

}