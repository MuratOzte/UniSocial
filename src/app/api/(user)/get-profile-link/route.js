import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(req) {
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

        const socialMediaLinks = await prisma.socialMediaLinks.findUnique({
            where: {
                userId,
            },
            select: {
                linkedin: true,
                github: true,
                twitter: true,
                instagram: true,
                facebook: true,
            },
        });

        
        //if (!socialMediaLinks) {
          //  return NextResponse.json(
            //    {
              //      message: 'Social media links not found for this user',
                //    status: 404,
                //},
                //{ status: 404 }
            //);
        //}

        return NextResponse.json(
            {
                message: 'Social media links retrieved successfully',
                links: socialMediaLinks,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching social media links:', error);
        return NextResponse.json(
            {
                message: 'An error occurred while fetching the social media links',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
