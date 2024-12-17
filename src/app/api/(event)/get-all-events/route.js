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
                    message: 'Community ID is required',
                },
                { status: 400 }
            );
        }

        // Fetch events
        const events = await prisma.event.findMany({
            orderBy: { date: 'asc' },
        });

        // Fetch community and participants for each event
        const enrichedEvents = await Promise.all(
            events.map(async (event) => {
                // Fetch community for the event
                const community = await prisma.community.findUnique({
                    where: { id: event.communityId },
                    select: {
                        name: true,
                        profilePicture: true,
                        id: true,
                    },
                });

                // Fetch participants for the event
                const participants = await prisma.eventParticipant.findMany({
                    where: { eventId: event.id },
                });

                return {
                    ...event,
                    community,
                    participants,
                };
            })
        );

        return NextResponse.json(
            {
                message: 'Events retrieved successfully',
                events: enrichedEvents,
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
