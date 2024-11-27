import { NextResponse } from 'next/server';

export async function POST(req, res) {
    const { name, surname, univercity, department, email, password } =
        await req.json();

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
