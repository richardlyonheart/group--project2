// src/context/AuthContext.tsx
"use client"; // Este contexto es para el cliente

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
  user_choice?: string;
  bio?: string; // Propiedad opcional
  profile_picture_url?: string; // Propiedad opcional
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoading: boolean; // Para saber si se está cargando el estado inicial
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Empezamos cargando
  const router = useRouter();

  // Función para verificar el estado de la sesión al cargar la app
  useEffect(() => {
    const checkSession = async () => {
      try {
        // En un escenario real, harías una petición para validar la sesión
        // por ejemplo, a /api/session para ver si la cookie es válida.
        // Por ahora, simularemos la carga.
        const response = await fetch('/api/session'); // Creamos esta API route después
        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user); // Asume que la API devuelve { user: { email, name, user_choice } }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []); // Se ejecuta una sola vez al montar el componente

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' }); // Llamada a la API de logout
    } catch (error) {
      console.error('Error during logout API call:', error);
    } finally {
      setUser(null); // Limpiamos el usuario en el estado
      router.push('/login'); // Redirigimos al login o a la home
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}