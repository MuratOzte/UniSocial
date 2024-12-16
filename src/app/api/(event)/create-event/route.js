import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { title, description, date, time, location, eventType, price } =
            await req.json();

        console.log(title, description, date, time, location, eventType, price);

        console.log(title, description, date, time, location, eventType, price);
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
        if (!title || !date || !time || !eventType || !communityId) {
            return NextResponse.json(
                {
                    message:
                        'Title, date, time, eventType, and communityId are required',
                    status: 400,
                },
                { status: 400 }
            );
        }
        const newEvent = await prisma.event.create({
            data: {
                title,
                description: description || null,
                date,
                time,
                location: location || null,
                eventType,
                price: price || null,
                communityId,
            },
        });
        return NextResponse.json(
            {
                message: 'Event created successfully',
                event: newEvent,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json(
            {
                message: 'An error occurred while creating the event',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
