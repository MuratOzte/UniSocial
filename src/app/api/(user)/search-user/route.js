import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req) {
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

        const { search } = await req.json();

        if (!search || search.trim() === '') {
            return NextResponse.json(
                { message: 'Search query is required' },
                { status: 400 }
            );
        }

        const users = await prisma.user.findMany({
            where: {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { surname: { contains: search, mode: 'insensitive' } },
                ],
            },
            select: {
                id: true,
                name: true,
                surname: true,
                profilePicture: true,
            },
            take: 10,
        });

        return NextResponse.json(
            { message: 'Users retrieved successfully', users },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            {
                message: 'An error occurred while searching for users',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
