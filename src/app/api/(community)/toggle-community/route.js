import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req) {
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

        const { communityId } = await req.json();
        if (!communityId) {
            return NextResponse.json(
                { message: 'Community ID is required' },
                { status: 400 }
            );
        }

        const existingMembership = await prisma.communityMember.findFirst({
            where: {
                userId,
                communityId,
            },
        });

        if (existingMembership) {
            await prisma.communityMember.delete({
                where: {
                    id: existingMembership.id,
                },
            });

            return NextResponse.json(
                { message: 'Successfully left the community' },
                { status: 200 }
            );
        } else {
            await prisma.communityMember.create({
                data: {
                    userId,
                    communityId,
                },
            });

            return NextResponse.json(
                { message: 'Successfully joined the community' },
                { status: 200 }
            );
        }
    } catch (error) {
        console.error('Error toggling community membership:', error);
        return NextResponse.json(
            {
                message:
                    'An error occurred while toggling community membership',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
