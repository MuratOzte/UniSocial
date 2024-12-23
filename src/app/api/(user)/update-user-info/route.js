import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function PUT(req) {
    try {
        const token = req.headers.get('authorization')?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json(
                { message: 'Token is required' },
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
                { message: 'Invalid or expired token' },
                { status: 401 }
            );
        }

        const userId = decoded?.id;
        const { type, ...updateData } = await req.json();

        console.log(type, updateData);

        if (!userId || !type) {
            return NextResponse.json(
                { message: 'User ID and type are required' },
                { status: 400 }
            );
        }

        if (!['user', 'community'].includes(type)) {
            return NextResponse.json(
                {
                    message:
                        'Invalid type, must be either "user" or "community"',
                },
                { status: 400 }
            );
        }

        let existingRecord;
        if (type === 'user') {
            existingRecord = await prisma.user.findUnique({
                where: { id: userId },
            });
        } else if (type === 'community') {
            existingRecord = await prisma.community.findUnique({
                where: { id: userId },
            });
        }

        if (!existingRecord) {
            return NextResponse.json(
                { message: `${type} not found` },
                { status: 404 }
            );
        }

        const updatedRecord = await prisma[type].update({
            where: { id: userId },
            data: {
                ...updateData,
                ...(updateData.password && {
                    password: updateData.password,
                }),
            },
        });

        return NextResponse.json(
            { message: `${type} updated successfully`, data: updatedRecord },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating record:', error);
        return NextResponse.json(
            {
                message: 'An error occurred while updating the record',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
