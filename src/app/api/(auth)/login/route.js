import { NextRequest, NextResponse } from 'next/server';

//localhost:3000/api/register

export async function POST(req, res) {
    const { email, password } = await req.json();
    return NextResponse.json({ message: 'Login successful', email, password });
}
