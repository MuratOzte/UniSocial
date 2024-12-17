import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { content, postId } = await req.json(); 

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

        const authorId = decoded.id;

        if (!content || !postId || !authorId) {
            return NextResponse.json(
                {
                    message: 'Content, postId, and authorId are required',
                    status: 400,
                },
                { status: 400 }
            );
        }

        const newComment = await prisma.comment.create({
            data: {
                content,
                authorId, 
                postId, 
            },
        });

        return NextResponse.json(
            {
                message: 'Comment created successfully',
                comment: newComment,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating comment:', error);
        return NextResponse.json(
            {
                message: 'An error occurred while creating the comment',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
