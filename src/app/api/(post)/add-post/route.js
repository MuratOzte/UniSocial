import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { title, content, image, authorId, communityId } =
            await req.json();

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
            decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET, .env dosyasından alınır
        } catch (err) {
            return NextResponse.json(
                {
                    message: 'Invalid token',
                    status: 401,
                },
                { status: 401 }
            );
        }

        if (!title || !content || !authorId) {
            return NextResponse.json(
                {
                    message: 'Title, content, and authorId are required',
                    status: 400,
                },
                { status: 400 }
            );
        }

        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                image: image || null, // Opsiyonel alan
                authorId,
                communityId: communityId || null, // Opsiyonel alan
            },
        });

        return NextResponse.json(
            {
                message: 'Post created successfully',
                post: newPost,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json(
            {
                message: 'An error occurred while creating the post',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
