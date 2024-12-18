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

export async function POST(req) {
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

        const { title, content, image } = await req.json();

        const communityId = decoded.id;

        if (!communityId) {
            return NextResponse.json(
                { message: 'Community ID is required' },
                { status: 400 }
            );
        }

        const community = await prisma.community.findUnique({
            where: { id: communityId },
        });

        console.log('community:', community);

        if (!community) {
            return NextResponse.json(
                { message: 'Community not found' },
                { status: 404 }
            );
        }
        console.log(content, image, communityId, decoded.id);

        const newPost = await prisma.post.create({
            data: {
                title: 'A',
                content: content,
                image: image || null,
                authorId: decoded.id,
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
