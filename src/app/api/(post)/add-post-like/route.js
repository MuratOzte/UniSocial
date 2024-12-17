import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { postId } = await req.json();

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

        if (!postId || !userId) {
            return NextResponse.json(
                {
                    message: 'Post ID and User ID are required',
                    status: 400,
                },
                { status: 400 }
            );
        }

        // Fetch the post
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

        // Check if the user has already liked the post
        const hasLiked = post.likedBy.includes(userId);

        // Update the likedBy array
        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: {
                likedBy: hasLiked
                    ? post.likedBy.filter((id) => id !== userId) // Unlike
                    : [...post.likedBy, userId], // Like
            },
        });

        return NextResponse.json(
            {
                message: hasLiked ? 'Post unliked' : 'Post liked',
                post: updatedPost,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error in like route:', error);
        return NextResponse.json(
            {
                message: 'An error occurred while liking the post',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
