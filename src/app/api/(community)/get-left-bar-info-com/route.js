import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const token = req.headers.get('authorization')?.replace('Bearer ', '');

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

        const communityId = decoded?.id;

        if (!communityId) {
            return NextResponse.json(
                {
                    message: 'User ID is required',
                },
                { status: 400 }
            );
        }

        const community = await prisma.community.findFirst({
            where: {
                id: communityId,
            },
            select: {
                id: true,
                posts: true,
                CommunityMember: true,
                name: true,
                description: true,
                profilePicture: true,
                activityField: true,
                events: true,
            },
        });

        if (!community) {
            return NextResponse.json(
                {
                    message: 'User not found',
                },
                { status: 404 }
            );
        }

        const totalPosts = community.posts.length;
        const totalFollowers = community.CommunityMember.length;
        const totalFollowing = community.CommunityMember.length;

        return NextResponse.json(
            {
                message: 'User data retrieved successfully',
                userData: {
                    profilePicture: community.profilePicture,
                    name: community.name,
                    surname: '',
                    univercity: community.type,
                    department: community.activityField,
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
