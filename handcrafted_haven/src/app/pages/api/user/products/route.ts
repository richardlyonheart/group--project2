// src/app/pages/api/user/products/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import pool from '@/app/lib/db';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const sessionToken = (await cookies()).get('sessionToken')?.value;

    if (!sessionToken) {
      // No hay token de sesión, no hay usuario logueado
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Primero, obtener el ID del usuario a partir del sessionToken (que actualmente es el email)
    // En una aplicación real con JWT, el token contendría el user ID.
    const userQuery = "SELECT id, user_choice FROM users WHERE email = $1";
    const userResult = await pool.query(userQuery, [sessionToken]);
    const user = userResult.rows[0];

    if (!user || user.user_choice !== 'seller') {
      return NextResponse.json({ message: 'Forbidden: Not a seller or user not found' }, { status: 403 });
    }

    // Ahora que tenemos el seller_id, obtenemos sus productos
    const productsQuery = `
      SELECT id, name, description, price, image_url, category, stock
      FROM products
      WHERE seller_id = $1
      ORDER BY created_at DESC
    `;
    const productsResult = await pool.query(productsQuery, [user.id]);
    const products = productsResult.rows;

    return NextResponse.json({ products }, { status: 200 });

  } catch (error) {
    console.error('Error fetching user products:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    const sessionToken = (await cookies()).get('sessionToken')?.value;
    if (!sessionToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userQuery = "SELECT id, user_choice FROM users WHERE email = $1";
    const userResult = await pool.query(userQuery, [sessionToken]);
    const user = userResult.rows[0];

    if (!user || user.user_choice !== 'seller') {
      return NextResponse.json({ message: 'Forbidden: Not a seller or user not found' }, { status: 403 });
    }

    const body = await request.json(); // Parse JSON from request body
    const { name, description, price, imageUrl, category, stock } = body;

    const insertQuery = `
      INSERT INTO products (name, description, price, image_url, category, stock, seller_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `;
    const insertResult = await pool.query(insertQuery, [name, description, price, imageUrl, category, stock, user.id]);
    const newProduct = insertResult.rows[0];

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });

  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}