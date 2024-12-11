import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET;

export async function POST(req) {
    try {
        if (!SECRET_KEY) {
            throw new Error(
                'JWT_SECRET is not defined in environment variables'
            );
        }

        const body = await req.json();
        if (!body) {
            return NextResponse.json(
                { message: 'Request body is missing', status: 400 },
                { status: 400 }
            );
        }

        const {
            name,
            surname,
            univercity,
            department,
            email,
            password,
            status,
        } = body;

        console.log('Request body:', body);

        if (
            !name ||
            !surname ||
            !univercity ||
            !department ||
            !email ||
            !password
        ) {
            return NextResponse.json(
                {
                    message: 'All required fields are not provided',
                    status: 400,
                },
                { status: 400 }
            );
        }

        const ifExist = await prisma.user.findUnique({ where: { email } });
        if (ifExist) {
            return NextResponse.json(
                { message: 'This email already exists', status: 400 },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const teacher = await prisma.user.create({
            data: {
                name,
                surname,
                univercity,
                status,
                department,
                email,
                password: hashedPassword,
                isTeacher: true,
            },
        });


        const token = jwt.sign(
            {
                id: teacher.id,
                email: teacher.email,
            },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        return NextResponse.json(
            {
                message: 'Teacher registered successfully',
                user: {
                    id: teacher.id,
                    name: teacher.name,
                    surname: teacher.surname,
                    univercity: teacher.univercity,
                    department: teacher.department,
                    email: teacher.email,
                },
                token,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error in registration:', error);
        return NextResponse.json(
            {
                message: 'Something went wrong',
                error: error?.message || 'Unknown error',
            },
            { status: 500 }
        );
    }
}
