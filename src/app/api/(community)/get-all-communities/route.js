import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const token = req.headers.get('authorization')?.replace('Bearer ', '');
        if (!token) {
            return NextResponse.json(
                { message: 'Token is required' },
                { status: 401 }
            );
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return NextResponse.json(
                { message: 'Invalid or expired token' },
                { status: 401 }
            );
        }

        const userId = decoded?.id;
        if (!userId) {
            return NextResponse.json(
                { message: 'Invalid token payload' },
                { status: 400 }
            );
        }

        const communities = await prisma.community.findMany({
            select: {
                id: true,
                name: true,
                type: true,
                activityField: true,
                profilePicture: true,
                email: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                posts: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                CommunityMember: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                profilePicture: true,
                            },
                        },
                    },
                },
                events: {
                    select: {
                        id: true,
                        title: true,
                        date: true,
                        time: true,
                    },
                },
            },
        });

        return NextResponse.json(
            {
                message: 'Communities retrieved successfully',
                communities,
                joinedCommunities: communities.filter((community) =>
                    community.CommunityMember.some(
                        (member) => member.user.id === userId
                    )
                ),
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error retrieving communities:', error);
        return NextResponse.json(
            {
                message: 'An error occurred while retrieving communities',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
