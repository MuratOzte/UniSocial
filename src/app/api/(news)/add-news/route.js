import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { content } = await req.json();

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

        const authorId = decoded.id;

        if (!content || !authorId) {
            return NextResponse.json(
                {
                    message: 'Content and authorId are required',
                    status: 400,
                },
                { status: 400 }
            );
        }

        const newNews = await prisma.news.create({
            data: {
                content,
                authorId,
            },
        });

        return NextResponse.json(
            {
                message: 'News created successfully',
                news: newNews,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating news:', error);
        return NextResponse.json(
            {
                message: 'An error occurred while creating the news',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
