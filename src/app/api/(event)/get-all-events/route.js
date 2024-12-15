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
                    status: 401,
                },
                { status: 401 }
            );
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return NextResponse.json(
                {
                    message: 'Invalid token',
                    status: 401,
                },
                { status: 401 }
            );
        }

        const communityId = decoded.id;

        if (!communityId) {
            return NextResponse.json(
                {
                    message: 'Community ID is required',
                    status: 400,
                },
                { status: 400 }
            );
        }

        const events = await prisma.event.findMany({
            where: { communityId },
            include: {
                community: {
                    select: { name: true, profilePicture: true, id: true },
                },
                participants: true,
            },
            orderBy: { date: 'asc' },
        });

        return NextResponse.json(
            {
                message: 'Events retrieved successfully',
                events,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error retrieving events:', error);
        return NextResponse.json(
            {
                message: 'An error occurred while retrieving events',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
