import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const token = req.headers.get('authorization')?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json(
                { message: 'Token is required' },
                { status: 401 }
            );
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) {
                throw new Error('Failed to decode token');
            }
        } catch (err) {
            return NextResponse.json(
                { message: 'Invalid or expired token' },
                { status: 401 }
            );
        }

        const userId = decoded?.id;

        if (!userId) {
            return NextResponse.json(
                { message: 'User ID is required' },
                { status: 400 }
            );
        }

        const about = await prisma.about.findUnique({
            where: { userId },
        });

        if (!about) {
            return NextResponse.json(
                { message: 'No about information found for this user' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'About information retrieved successfully', about },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching about information:', error);
        return NextResponse.json(
            {
                message: 'An error occurred while fetching about information',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
