import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        // Query parametrelerinden userId'yi al
        const { searchParams } = new URL(req.nextUrl);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { message: 'User ID is required.', status: 400 },
                { status: 400 }
            );
        }

        // Kullanıcıyı ilişkili verileriyle birlikte getir
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                posts: true, // Kullanıcının yazıları
                followers: {
                    include: {
                        follower: { select: { id: true, name: true, surname: true } },
                    },
                }, // Kullanıcıyı takip edenler
                following: {
                    include: {
                        following: { select: { id: true, name: true, surname: true } },
                    },
                }, // Kullanıcının takip ettikleri
            },
        });

        if (!user) {
            return NextResponse.json(
                { message: 'User not found.', status: 404 },
                { status: 404 }
            );
        }

        // Kullanıcı verilerini döndür
        return NextResponse.json({
            message: 'User retrieved successfully.',
            user,
        });
    } catch (error) {
        console.error("Error in get-user API:", error);
        return NextResponse.json(
            { message: error, status: 500 },
            { status: 500 }
        );
    }
}
