import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req) {
    const { name, surname, univercity, department, email, password } =
        await req.json();

    const ifExist = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (ifExist) {
        return NextResponse.json(
            {
                message: 'This email already exists',
                status: 400,
            },
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
        },
    });

    return NextResponse.json({
        message: 'Student registered successfully',
        user: {
            id: student.id,
            name: student.name,
            surname: student.surname,
            univercity: student.univercity,
            department: student.department,
            email: student.email,
        },
    });
}
