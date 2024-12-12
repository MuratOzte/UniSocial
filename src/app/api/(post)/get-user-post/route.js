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

        const userId = decoded.id;
        if (!userId) {
            return NextResponse.json(
                { message: 'User ID not found in token' },
                { status: 401 }
            );
        }

        const url = new URL(req.url);
        const targetUserId = url.searchParams.get('targetUserId') || userId;

        const userPosts = await prisma.post.findMany({
            where: {
                userId: targetUserId,
            },
        });

        return NextResponse.json(
            {
                message: 'Posts fetched successfully',
                posts: userPosts,
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
