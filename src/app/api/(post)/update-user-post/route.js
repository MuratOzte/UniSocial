import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function PUT(req) {
    try {
        const { postId, content, image } = await req.json();
        const title = 'A';

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

        if (!postId || !title || !content) {
            return NextResponse.json(
                {
                    message: 'Post ID, title, and content are required',
                    status: 400,
                },
                { status: 400 }
            );
        }

        const existingPost = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!existingPost) {
            return NextResponse.json(
                {
                    message: 'Post not found',
                    status: 404,
                },
                { status: 404 }
            );
        }

        if (existingPost.authorId !== userId) {
            return NextResponse.json(
                {
                    message: 'You are not authorized to update this post',
                    status: 403,
                },
                { status: 403 }
            );
        }

        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: {
                title,
                content,
                image: image || existingPost.image, 
            },
        });

        return NextResponse.json(
            {
                message: 'Post updated successfully',
                post: updatedPost,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json(
            {
                message: 'An error occurred while updating the post',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
