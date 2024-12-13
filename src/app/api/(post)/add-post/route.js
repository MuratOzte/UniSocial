import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const {content, image, communityId } =
            await req.json();

        const token = req.headers.get('authorization')?.replace('Bearer ', '');

        const title = 'A';

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
                image: image || null, 
                authorId,
                communityId: communityId || null, 
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
