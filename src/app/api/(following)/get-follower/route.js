import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
};

export async function GET(req) {
    try {
        const authHeader = req.headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json(
                { message: 'Authorization token is required.', status: 401 },
                { status: 401 }
            );
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);

        const userId = decoded.id;

        if (!userId) {
            return NextResponse.json(
                { message: 'User ID is required.', status: 400 },
                { status: 400 }
            );
        }

        const followers = await prisma.follower.findMany({
            where: { followerId: userId },
        });

        console.log(userId);

        if (!followers) {
            return NextResponse.json(
                { message: 'No followers found.', status: 404 },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Followers retrieved successfully.',
            followers,
        });
    } catch (error) {
        console.error('Error in get-user API:', error);
        return NextResponse.json(
            { message: error, status: 500 },
            { status: 500 }
        );
    }
}
