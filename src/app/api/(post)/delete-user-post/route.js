import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function DELETE(req) {
    try {
        const token = req.headers.get('authorization')?.replace('Bearer ', '');
        const body = await req.json();

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

        const postId = body.postId;
        console.log(postId);

        if (!postId) {
            return NextResponse.json(
                {
                    message: 'Post ID is required',
                    status: 400,
                },
                { status: 400 }
            );
        }

        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return NextResponse.json(
                {
                    message: 'Post not found',
                    status: 404,
                },
                { status: 404 }
            );
        }

        if (post.authorId !== userId) {
            return NextResponse.json(
                {
                    message: 'You are not authorized to delete this post',
                    status: 403,
                },
                { status: 403 }
            );
        }

        await prisma.post.delete({
            where: { id: postId },
        });

        return NextResponse.json(
            {
                message: 'Post deleted successfully',
                status: 200,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json(
            {
                message: 'An error occurred while deleting the post',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
