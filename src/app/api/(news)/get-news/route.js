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


        const news = await prisma.news.findMany({
            take: 5,
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                author: {
                    select: {
                        name: true,
                        surname: true,
                    },
                },
            },
        });

        return NextResponse.json(
            {
                message: 'News fetched successfully',
                news,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching news:', error);
        return NextResponse.json(
            {
                message: 'An error occurred while fetching news',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
