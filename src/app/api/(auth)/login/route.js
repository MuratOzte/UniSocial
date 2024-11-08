import { NextRequest, NextResponse } from 'next/server';

//localhost:3000/api/register

export async function GET(req, res) {
    return NextResponse.json({ message: 'Register route' });
}
