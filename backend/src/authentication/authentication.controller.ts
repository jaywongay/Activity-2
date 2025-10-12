import { Controller, Post, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      throw new UnauthorizedException('Registration failed: ' + error.message);
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      throw new UnauthorizedException('Login failed: ' + error.message);
    }
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Request password reset' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    try {
      return await this.authService.forgotPassword(forgotPasswordDto);
    } catch (error) {
      throw new BadRequestException('Failed to process password reset request: ' + error.message);
    }
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password with token' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      return await this.authService.resetPassword(resetPasswordDto);
    } catch (error) {
      throw new BadRequestException('Failed to reset password: ' + error.message);
    }
  }

  @Post('test-email')
@ApiOperation({ summary: 'Test email sending' })
async testEmail(@Body('email') email: string) {
  console.log('=== TEST EMAIL ENDPOINT CALLED ===');
  console.log('Target email:', email);
  console.log('EMAIL_USER from env:', process.env.EMAIL_USER);
  console.log('EMAIL_PASSWORD exists:', !!process.env.EMAIL_PASSWORD);
  console.log('EMAIL_PASSWORD length:', process.env.EMAIL_PASSWORD?.length);
  
  try {
    await this.authService.emailService.sendPasswordResetEmail(email, 'test-token-123');
    return { 
      success: true, 
      message: 'Test email sent successfully!',
      emailUser: process.env.EMAIL_USER 
    };
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return { 
      success: false, 
      error: error.message,
      stack: error.stack
    };
  }
}

}