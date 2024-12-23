import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

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
        } catch {
            return NextResponse.json(
                { message: 'Invalid or expired token' },
                { status: 401 }
            );
        }

        const userId = decoded?.id;
        if (!userId) {
            return NextResponse.json(
                { message: 'User ID is required' },
                { status: 401 }
            );
        }

        try {
            const about = await prisma.about.findUnique({ where: { userId } });
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
                { message: 'Database query failed', error: error.message },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json(
            { message: 'An unexpected error occurred', error: error.message },
            { status: 500 }
        );
    }
}
