// src/app/api/session/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import pool from '@/app/lib/db';

export async function GET(request: Request) {
  try {
    const sessionToken = (await cookies()).get('sessionToken')?.value;

    if (!sessionToken) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // Asegúrate de seleccionar el 'id' del usuario
    const query = "SELECT id, name, email, user_choice FROM users WHERE email = $1";
    const result = await pool.query(query, [sessionToken]);
    const user = result.rows[0];

    if (user) {
      // Devuelve el id del usuario en la respuesta
      return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name, user_choice: user.user_choice } }, { status: 200 });
    } else {
      (await cookies()).delete('sessionToken');
      return NextResponse.json({ user: null }, { status: 200 });
    }

  } catch (error) {
    console.error('Error checking session:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}