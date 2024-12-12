import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET 

export async function POST(req) {
    try {
        const body = await req.json();

        if (!body) {
            return NextResponse.json(
                { message: 'Request body is missing', status: 400 },
                { status: 400 }
            );
        }

        const { name, surname, univercity, department, email, password } = body;

        if (
            !name ||
            !surname ||
            !univercity ||
            !department ||
            !email ||
            !password
        ) {
            return NextResponse.json(
                { message: 'All fields are required', status: 400 },
                { status: 400 }
            );
        }

        const ifExist = await prisma.user.findUnique({ where: { email } });

        if (ifExist) {
            return NextResponse.json(
                { message: 'This email already exists' },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = await prisma.user.create({
            data: {
                name,
                surname,
                univercity,
                department,
                email,
                password: hashedPassword,
                isTeacher: false,
            },
        });

        const token = jwt.sign(
            { id: student.id, email: student.email, isTeacher: false },
            SECRET_KEY,
            { expiresIn: '1h' } 
        );

        return NextResponse.json(
            {
                message: 'Student registered successfully',
                user: {
                    id: student.id,
                    name: student.name,
                    surname: student.surname,
                    univercity: student.univercity,
                    department: student.department,
                    email: student.email,
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
