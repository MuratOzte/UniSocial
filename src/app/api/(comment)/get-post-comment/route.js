import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        // Extract query parameters from the URL
        const { searchParams } = new URL(req.url);
        const postId = searchParams.get('postId');

        if (!postId) {
            return NextResponse.json(
                { message: 'Post ID is required' },
                { status: 400 }
            );
        }

        // Fetch comments for the specified postId
        const comments = await prisma.comment.findMany({
            where: { postId },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        profilePicture: true,
                        isTeacher: true,
                    },
                },
            },
        });

        if (comments.length === 0) {
            return NextResponse.json(
                { message: 'No comments found for this post' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: 'Comments fetched successfully',
                comments,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json(
            {
                message: 'An error occurred while fetching the comments',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
