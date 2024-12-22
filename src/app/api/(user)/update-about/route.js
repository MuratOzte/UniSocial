import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function PUT(req) {
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

        const userId = decoded?.id;

        if (!userId) {
            return NextResponse.json(
                {
                    message: 'User ID is required',
                },
                { status: 400 }
            );
        }

        const body = await req.json();

        if (
            !body.description &&
            !body.location &&
            !body.birthDate &&
            !body.gender &&
            !body.hobbies &&
            !body.telno &&
            !body.email
        ) {
            return NextResponse.json(
                {
                    message: 'No data provided to update',
                },
                { status: 400 }
            );
        }

        const updatedAbout = await prisma.about.upsert({
            where: { userId },
            update: {
                description: body.description || undefined,
                location: body.location || undefined,
                birthDate: body.birthDate || undefined,
                email: body.email || undefined,
                telno: body.telno || undefined,
                hobbies: body.hobbies || undefined,
                gender: body.gender || undefined,
            },
            create: {
                userId,
                description: body.description || null,
                location: body.location || null,
                birthDate: body.birthDate || null,
                email: body.email || null,
                telno: body.telno || null,
                hobbies: body.hobbies || null,
                gender: body.gender || null,
            },
        });

        console.log(updatedAbout);

        return NextResponse.json(
            {
                message: 'About information updated successfully',
                updatedAbout,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating about information:', error);
        return NextResponse.json(
            {
                message: 'An error occurred while updating about information',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
