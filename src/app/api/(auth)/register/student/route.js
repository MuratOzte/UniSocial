import { NextResponse } from 'next/server';

import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req, res) {
    const { name, surname, univercity, department, email, password } =
        await req.json();

    const ifExist = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (ifExist) {
        return NextResponse.json({
            message: 'This email already exist',
            status: 400,
        });
    }

    const student = await prisma.user.create({
        data: {
            name,
            surname,
            univercity,
            department,
            email,
            password,
        },
    });

    return NextResponse.json({
        message: 'student register successful',
        name,
        surname,
        univercity,
        department,
        email,
        password,
    });
}
