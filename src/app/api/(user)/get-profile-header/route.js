import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const token = req.headers.get('authorization')?.replace('Bearer ', '');
        const userId = req.nextUrl.searchParams.get('userId');

        if (!token) {
            return NextResponse.json(
                {
                    message: 'Token is required',
                },
                { status: 401 }
            );
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) {
                throw new Error('Failed to decode token');
            }
        } catch (err) {
            return NextResponse.json(
                {
                    message: 'Invalid or expired token',
                },
                { status: 401 }
            );
        }

        if (!userId) {
            return NextResponse.json(
                {
                    message: 'User ID is required',
                },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                name: true,
                surname: true,
                univercity: true,
                department: true,
                posts: true,
                following: true,
                followers: true,
                profilePicture: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                {
                    message: 'User not found',
                },
                { status: 404 }
            );
        }

        const totalPosts = user.posts.length;
        const totalFollowers = user.followers.length;
        const totalFollowing = user.following.length;

        return NextResponse.json(
            {
                message: 'User data retrieved successfully',
                userData: {
                    profilePicture: user.profilePicture,
                    name: user.name,
                    surname: user.surname,
                    univercity: user.univercity,
                    department: user.department,
                    totalPosts,
                    totalFollowers,
                    totalFollowing,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error retrieving user data:', error);
        return NextResponse.json(
            {
                message: 'An error occurred while retrieving user data',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
