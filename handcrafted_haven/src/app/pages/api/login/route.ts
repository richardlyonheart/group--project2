// src/app/pages/api/login/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import pool from '@/app/lib/db'
import bcrypt from 'bcrypt';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Missing credentials' }, { status: 400 });
    }

    
    const query = "SELECT id, email, password, name, user_choice FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);
    const user = result.rows[0];

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    (await cookies()).set('sessionToken', user.email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    console.log('Usuario logueado:', user.email);
    
    return NextResponse.json({ message: 'Logged in successfully', user: { id: user.id, email: user.email, name: user.name, user_choice: user.user_choice } }, { status: 200 });

  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}