import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { followerId, followingId } = await req.json();

        if (followerId === followingId) {
            return NextResponse.json(
                { message: 'You cannot follow yourself.', status: 400 },
                { status: 400 }
            );
        }

        const follower = await prisma.user.findUnique({
            where: { id: followerId },
        });

        const following = await prisma.user.findUnique({
            where: { id: followingId },
        });

        if (!follower || !following) {
            return NextResponse.json(
                { message: 'User not found.', status: 404 },
                { status: 404 }
            );
        }

        const existingFollower = await prisma.follower.findFirst({
            where: {
                followerId: followerId,
                followingId: followingId,
            },
        });

        if (existingFollower) {
            return NextResponse.json(
                { message: 'You are already following this user.', status: 400 },
                { status: 400 }
            );
        }

        const newFollower = await prisma.follower.create({
            data: {
                followerId,
                followingId,
            },
        });

        return NextResponse.json({
            message: 'Successfully followed the user.',
            follower: newFollower,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: error, status: 500 },
            { status: 500 }
        );
    }
}
