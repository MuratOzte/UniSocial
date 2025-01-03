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

        const posts = await prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
            where: { authorId: userId },
        });

        const enrichedPosts = await Promise.all(
            posts.map(async (post) => {
                const author =
                    (await prisma.user.findUnique({
                        where: { id: post.authorId },
                        select: {
                            id: true,
                            name: true,
                            profilePicture: true,
                            isTeacher: true,
                        },
                    })) ||
                    (await prisma.community.findUnique({
                        where: { id: post.authorId },
                        select: {
                            id: true,
                            name: true,
                            profilePicture: true,
                        },
                    }));

                const comments = await prisma.comment.findMany({
                    where: { postId: post.id },
                    orderBy: { createdAt: 'desc' },
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        authorId: true,
                        authorType: true, 
                    },
                });

                const enrichedComments = await Promise.all(
                    comments.map(async (comment) => {
                        const commentAuthor =
                            comment.authorType === 'USER'
                                ? await prisma.user.findUnique({
                                      where: { id: comment.authorId },
                                      select: {
                                          id: true,
                                          name: true,
                                          profilePicture: true,
                                          isTeacher: true,
                                      },
                                  })
                                : await prisma.community.findUnique({
                                      where: { id: comment.authorId },
                                      select: {
                                          id: true,
                                          name: true,
                                          profilePicture: true,
                                      },
                                  });

                        return {
                            ...comment,
                            author: commentAuthor,
                        };
                    })
                );

                return {
                    ...post,
                    author,
                    comments: enrichedComments,
                    isYourPost: post.authorId === userId,
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
