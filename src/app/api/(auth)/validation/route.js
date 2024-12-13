import { NextResponse } from 'next/server';
import mailjet from 'node-mailjet';

export async function POST(req) {
    try {
        const { email, name } = await req.json();

        const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

        const mailjetClient = mailjet.apiConnect(
            process.env.EMAIL_API_KEY,
            process.env.EMAIL_SECRET_KEY
        );


        const response = await mailjetClient
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: process.env.NODE_EMAIL,
                            Name: 'UniSocial',
                        },
                        To: [
                            {
                                Email: email,
                                Name: name || 'Recipient',
                            },
                        ],
                        Subject: 'UniSocial Doğrulama Kodu',
                        TextPart:
                            `Doğrulama Kodunuz: ${verificationCode}\nBu kodu kimseyle paylaşmayınız.`,
                        HTMLPart: `
                            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
                                <h2 style="text-align: center; color: #007bff; margin-bottom: 20px;">Email Verification</h2>
                                <p style="font-size: 16px; text-align: justify; line-height: 1.6;">
                                    Thank you for signing up! Please use the following verification code to complete your registration:
                                </p>
                                <div style="text-align: center; margin: 20px 0;">
                                    <span style="
                                        display: inline-block;
                                        font-size: 24px;
                                        font-weight: bold;
                                        color: #007bff;
                                        background-color: #eef;
                                        padding: 10px 20px;
                                        border-radius: 5px;
                                        border: 1px solid #007bff;
                                    ">
                                        ${verificationCode}
                                    </span>
                                </div>
                                <p style="font-size: 14px; text-align: center; color: #555;">
                                    If you didn't request this code, you can safely ignore this email.
                                </p>
                                <div style="text-align: center; margin-top: 20px;">
                                    <a href="https://yourwebsite.com/verify" style="
                                        display: inline-block;
                                        text-decoration: none;
                                        background-color: #007bff;
                                        color: white;
                                        padding: 10px 20px;
                                        border-radius: 5px;
                                        font-size: 16px;
                                        font-weight: bold;
                                    ">
                                        Verify Now
                                    </a>
                                </div>
                                <p style="font-size: 12px; color: #aaa; text-align: center; margin-top: 20px;">
                                    © 2024 Your Company. All rights reserved.
                                </p>
                            </div>
                        `,
                    },
                ],
            });

        return NextResponse.json({
            message: 'Email sent successfully',
            verificationCode: 1234, 
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message: 'An error occurred during email sending',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
