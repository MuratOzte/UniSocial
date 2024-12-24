import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const token = req.headers.get('authorization')?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json(
                {
                    message: 'Token is required',
                    status: 401,
                },
                { status: 401 }
            );
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return NextResponse.json(
                {
                    message: 'Invalid token',
                    status: 401,
                },
                { status: 401 }
            );
        }

        const userId = decoded.id;

        if (!userId) {
            return NextResponse.json(
                {
                    message: 'User ID is required',
                    status: 400,
                },
                { status: 400 }
            );
        }

        const users = await prisma.user.findMany({
            where: {
                id: {
                    not: userId,
                },
                followers: {
                    none: {
                        followerId: userId,
                    },
                },
            },
            take: 5,
        });

        return NextResponse.json(
            {
                message: 'Random users fetched successfully',
                users,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            {
                message: 'An error occurred while fetching users',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
