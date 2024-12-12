import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Token doğrulama fonksiyonu
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

        // Token'i doğrula
        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.json(
                { message: 'Invalid or expired token' },
                { status: 401 }
            );
        }

        const communityId = decoded.id;

        if (!communityId) {
            return NextResponse.json(
                { message: 'Community ID is required' },
                { status: 400 }
            );
        }

        // Community'nin varlığını kontrol et
        const community = await prisma.community.findUnique({
            where: { id: communityId },
        });

        if (!community) {
            return NextResponse.json(
                { message: 'Community not found' },
                { status: 404 }
            );
        }

        const posts = await prisma.post.findMany({
            where: { communityId },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                comments: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json({
            message: 'Posts retrieved successfully',
            posts,
        });
    } catch (error) {
        console.error('Error retrieving posts:', error);
        return NextResponse.json(
            {
                message: 'An error occurred while retrieving posts',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
