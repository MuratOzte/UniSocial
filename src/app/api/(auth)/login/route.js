import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const generateToken = (entity) => {
    return jwt.sign(
        { id: entity.id, email: entity.email, name: entity.name },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        let userOrCommunity = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        let entityType = 'user';

        if (!userOrCommunity) {
            userOrCommunity = await prisma.community.findUnique({
                where: {
                    email,
                },
            });
            entityType = 'community';
        }

        if (!userOrCommunity) {
            return NextResponse.json(
                {
                    message: 'Email not found',
                    status: 404,
                },
                { status: 404 }
            );
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            userOrCommunity.password
        );
        if (!isPasswordValid) {
            return NextResponse.json(
                {
                    message: 'Incorrect password',
                    status: 401,
                },
                { status: 401 }
            );
        }

        const token = generateToken(userOrCommunity);

        return NextResponse.json({
            message: `${entityType} logged in successfully`,
            [entityType]: {
                id: userOrCommunity.id,
                name: userOrCommunity.name,
                email: userOrCommunity.email,
                profilePicture: userOrCommunity.profilePicture,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message: 'An error occurred during login',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
