import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return NextResponse.json(
                {
                    message: 'Email not found',
                    status: 404,
                },
                { status: 404 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                {
                    message: 'Incorrect password',
                    status: 401,
                },
                { status: 401 }
            );
        }

        return NextResponse.json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message: 'An error occurred during login',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
