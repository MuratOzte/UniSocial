import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req) {
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

        const userId = decoded.id;

        if (!userId) {
            return NextResponse.json(
                {
                    message: 'User ID is required',
                    status: 400,
                },
                { status: 400 }
            );
        }

        const body = await req.json();
        const { linkedin, github, twitter, instagram, facebook } = body;

        const updatedLinks = await prisma.socialMediaLinks.upsert({
            where: {
                userId,
            },
            update: {
                linkedin: linkedin || undefined,
                github: github || undefined,
                twitter: twitter || undefined,
                instagram: instagram || undefined,
                facebook: facebook || undefined,
            },
            create: {
                userId,
                linkedin: linkedin || null,
                github: github || null,
                twitter: twitter || null,
                instagram: instagram || null,
                facebook: facebook || null,
            },
        });

        return NextResponse.json(
            {
                message: 'Social media links updated successfully',
                links: updatedLinks,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating social media links:', error);
        return NextResponse.json(
            {
                message:
                    'An error occurred while updating the social media links',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
