import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { eventId } = await req.json();

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

        const userId = decoded.id;

        if (!eventId) {
            return NextResponse.json(
                {
                    message: 'Event ID is required',
                    status: 400,
                },
                { status: 400 }
            );
        }

        const existingParticipation = await prisma.eventParticipant.findFirst({
            where: {
                eventId,
                userId,
            },
        });

        if (existingParticipation) {
            return NextResponse.json(
                {
                    message: 'User already joined this event',
                    status: 400,
                },
                { status: 400 }
            );
        }

        const newParticipation = await prisma.eventParticipant.create({
            data: {
                eventId,
                userId,
            },
        });

        return NextResponse.json(
            {
                message: 'User successfully joined the event',
                participation: newParticipation,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error joining event:', error);
        return NextResponse.json(
            {
                message: 'An error occurred while joining the event',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
