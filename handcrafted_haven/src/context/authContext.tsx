// src/context/AuthContext.tsx
"use client"; // Este contexto es para el cliente

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
  user_choice?: string;
  bio?: string; 
  profile_picture_url?: string; 
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); 
  const router = useRouter();

  
  useEffect(() => {
    const checkSession = async () => {
      try {
        
        const response = await fetch('/api/session'); 
        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user); 
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []); 

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' }); 
    } catch (error) {
      console.error('Error during logout API call:', error);
    } finally {
      setUser(null); 
      router.push('/login'); 
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