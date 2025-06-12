// src/app/api/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // Para manipular cookies en Server Components/Routes

export async function POST(request: Request) {
  try {
    (await cookies()).delete('sessionToken'); // Borra la cookie de sesión (usaremos 'sessionToken' como nombre)
    return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}