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

        const {
            name,
            surname,
            profilePicture,
            password,
        } = await req.json();

        if (!name || !surname || !univercity || !department) {
            return NextResponse.json(
                {
                    message:
                        'Name, surname, university, and department are required fields',
                },
                { status: 400 }
            );
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name,
                surname,
                profilePicture,
                password,
            },
        });

        return NextResponse.json(
            {
                message: 'User updated successfully',
                user: updatedUser,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json(
            {
                message: 'An error occurred while updating the user',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
