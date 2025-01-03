import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const token = req.headers.get('authorization')?.replace('Bearer ', '');
        const userId = req.nextUrl.searchParams.get('userId');

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

        if (!userId) {
            return NextResponse.json(
                {
                    message: 'User ID is required',
                },
                { status: 400 }
            );
        }

        const about = await prisma.about.findUnique({
            where: { userId: userId },
        });

        const links = await prisma.socialMediaLinks.findUnique({
            where: { userId: userId },
        });

        console.log(about, links);

        return NextResponse.json(
            {
                message: 'User data retrieved successfully',
                about: about,
                links: links,
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
