// src/app/api/register/route.ts
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db'
import bcrypt from 'bcrypt';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { name, email, password, user_choice } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({message: 'Missing credentials'}, { status: 400 });
    }
    if (!['buyer', 'seller'].includes(user_choice)) {
      return NextResponse.json({ message: 'Invalid role selection' }, { status: 400 });
    }

    const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
    const userCheckResult = await pool.query(checkUserQuery, [email]);

    if (userCheckResult.rowCount > 0) {
      return NextResponse.json(
        { message: 'Email already in use' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUserQuery = `
      INSERT INTO users (name, email, password, user_choice)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, user_choice
    `;
    const result = await pool.query(insertUserQuery, [name, email, hashedPassword, user_choice]);
    const newUser = result.rows[0]; // newUser ahora incluye el ID

    console.log('Usuario registrado:', { name, email, hashedPassword, user_choice });

    // Puedes devolver el nuevo usuario (incluyendo su ID) si es útil para el front-end
    return NextResponse.json({ message: 'User registered successfully', user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return new NextResponse('Something went wrong', { status: 500 });
  }
}