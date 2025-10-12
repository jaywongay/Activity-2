// backend/src/authentication/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    console.log('📧 Initializing Email Service...');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASSWORD exists:', !!process.env.EMAIL_PASSWORD);
    
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    this.transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Email transporter error:', error);
      } else {
        console.log('✅ Email server is ready to send messages');
      }
    });
  }

  async sendPasswordResetEmail(email: string, resetToken: string) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    
    console.log('📧 Preparing to send email to:', email);
    console.log('📧 Reset URL:', resetUrl);
    
    const mailOptions = {
      from: `"Notes App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Reset Your Password - Notes App',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
              background: #f3f4f6;
              padding: 20px;
            }
            .wrapper { max-width: 500px; margin: 0 auto; }
            .card {
              background: #fff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 32px 24px;
              text-align: center;
              color: #fff;
            }
            .header-icon { font-size: 36px; margin-bottom: 12px; }
            .header h1 {
              font-size: 24px;
              font-weight: 700;
              margin-bottom: 4px;
            }
            .header p {
              font-size: 13px;
              opacity: 0.9;
              margin: 0;
            }
            .body {
              padding: 28px 24px;
            }
            .body p {
              font-size: 14px;
              color: #374151;
              margin-bottom: 16px;
              line-height: 1.5;
            }
            .body p:first-child { margin-bottom: 12px; }
            .btn-container {
              text-align: center;
              margin: 24px 0;
            }
            .btn {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: #fff;
              text-decoration: none;
              padding: 12px 32px;
              border-radius: 8px;
              font-weight: 600;
              font-size: 14px;
              box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
            }
            .alert {
              background: #fef3c7;
              border-left: 4px solid #f59e0b;
              padding: 12px 16px;
              margin: 20px 0;
              border-radius: 6px;
              font-size: 13px;
            }
            .alert-title {
              color: #b45309;
              font-weight: 700;
              margin-bottom: 4px;
            }
            .alert p { color: #92400e; margin: 0; line-height: 1.4; }
            .divider { height: 1px; background: #e5e7eb; margin: 20px 0; }
            .link-section {
              background: #f9fafb;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 12px 16px;
              margin: 20px 0;
            }
            .link-label {
              font-size: 12px;
              color: #6b7280;
              font-weight: 600;
              margin-bottom: 8px;
            }
            .link-box {
              background: #fff;
              border: 1px solid #d1d5db;
              padding: 10px 12px;
              border-radius: 6px;
              font-size: 11px;
              color: #667eea;
              word-break: break-all;
              font-family: monospace;
            }
            .footer {
              background: #f9fafb;
              padding: 16px 24px;
              text-align: center;
              border-top: 1px solid #e5e7eb;
            }
            .footer p {
              font-size: 12px;
              color: #6b7280;
              margin: 4px 0;
            }
            .footer a {
              color: #667eea;
              text-decoration: none;
              font-weight: 600;
            }
            @media (max-width: 500px) {
              .header { padding: 24px 20px; }
              .body { padding: 20px; }
              .header h1 { font-size: 22px; }
              .btn { padding: 10px 24px; font-size: 13px; }
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="card">
              <div class="header">
                <div class="header-icon">🔐</div>
                <h1>Password Reset</h1>
                <p>Secure your account now</p>
              </div>
              
              <div class="body">
                <p>Hello,</p>
                <p>We received a request to reset your Notes App password. Click the button below to create a new one:</p>
                
                <div class="btn-container">
                  <a href="${resetUrl}" class="btn">Reset Password</a>
                </div>
                
                <div class="alert">
                  <div class="alert-title">⏱️ Valid for 1 hour</div>
                  <p>This link will expire in 1 hour for your security.</p>
                </div>
                
                <div class="divider"></div>
                
                <p style="font-size: 12px; color: #6b7280; margin-bottom: 8px;">Didn't request this? No worries, your account is safe. If you believe something is wrong, <a href="mailto:${process.env.EMAIL_USER}" style="color: #667eea; text-decoration: none; font-weight: 600;">contact us</a>.</p>
                
                <div class="link-section">
                  <div class="link-label">Or copy this link:</div>
                  <div class="link-box">${resetUrl}</div>
                </div>
              </div>
              
              <div class="footer">
                <p><strong>Notes App</strong></p>
                <p>© ${new Date().getFullYear()} All rights reserved</p>
                <p style="margin-top: 8px; font-size: 11px;">This is an automated message. Please do not reply.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };
  
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully!');
      console.log('Message ID:', info.messageId);
      console.log('Response:', info.response);
      return { success: true };
    } catch (error) {
      console.error('❌ Error sending email:');
      console.error('Error message:', error.message);
      console.error('Error code:', error.code);
      console.error('Full error:', error);
      throw new Error('Failed to send password reset email');
    }
  }
}