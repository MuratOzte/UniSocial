import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

export async function GET(req) {
    try {
        const token = req.headers.get('Authorization')?.split(' ')[1];
        if (!token) {
            return NextResponse.json(
                { message: 'Token is required' },
                { status: 401 }
            );
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.json(
                { message: 'Invalid or expired token' },
                { status: 401 }
            );
        }

        const posts = await prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
        });

        const enrichedPosts = await Promise.all(
            posts.map(async (post) => {
                const author = await prisma.user.findUnique({
                    where: { id: post.authorId },
                    select: {
                        id: true,
                        name: true,
                        profilePicture: true,
                        isTeacher: true,
                    },
                });

                const comments = await prisma.comment.findMany({
                    where: { postId: post.id },
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        authorId: true,
                    },
                });

                return {
                    ...post,
                    author,
                    comments,
                };
            })
        );

        return NextResponse.json(
            {
                message: 'Posts fetched successfully',
                posts: enrichedPosts,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json(
            {
                message: 'An error occurred while fetching the posts',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
