// src/components/header.tsx
"use client";
import Link from 'next/link';
import { useAuth } from '@/context/authContext';
import styles from './header.module.css';

export default function Header() {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.left}>Loading...</div>
          <div className={styles.right}>Loading...</div>
        </nav>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.left}>
          {/* Logo a futuro aquí */}
          <Link href="/" className={styles.link}>Home</Link>
          <Link href="/about" className={styles.link}>About</Link>
          <Link href="/artisans" className={styles.link}>Artisans</Link>
          <Link href="/contact" className={styles.link}>Contact</Link>
          {user && user.user_choice === 'seller' && (
            <Link href="/profile/seller/add-product" className={styles.link}>
              Add Product
            </Link>
          )}
        </div>
        <div className={styles.right}>
          {user ? (
            <>
              {/* Si es vendedor, ir a su dashboard. Si es comprador, ir al dashboard de comprador */}
              {user.user_choice === 'seller' ? (
                <Link href="/dashboard/seller" className={styles.link}>
                  Dashboard ({user.name})
                </Link>
              ) : (
                <Link href="/dashboard/buyer" className={styles.link}>
                  Dashboard ({user.name})
                </Link>
              )}

              <button onClick={logout} className={styles.linkButton}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.link}>Log In</Link>
              <Link href="/signup" className={styles.link}>Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}