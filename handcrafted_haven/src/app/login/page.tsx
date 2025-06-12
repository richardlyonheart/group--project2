// src/app/login/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { useAuth } from '@/context/authContext'; // <-- Importa useAuth

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth(); // <-- Obtén la función login del contexto

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('/pages/api/login', { // Asegúrate de que esta ruta sea la correcta (pages/api o api)
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        // <-- ¡AQUÍ ESTÁ EL CAMBIO CLAVE!
        login(data.user); // Llama a la función login del contexto con los datos del usuario
        router.push('/'); // Redirige a la página principal
      } else {
        setError(data?.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Log In</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.button}>Log In</button>
        <p className={styles.signUpLink}>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
}