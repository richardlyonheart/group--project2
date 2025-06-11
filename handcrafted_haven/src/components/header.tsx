import Link from 'next/link';
import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <Link href="/" className={styles.link}>Home</Link>
          <Link href="/about" className={styles.link}>About</Link>
          <Link href="/artisans" className={styles.link}>Artisans</Link>
          <Link href="/contact" className={styles.link}>Contact</Link>
        </div>
        <div className={styles.right}>
          <Link href="/login" className={styles.link}>Log in</Link>
          <Link href="/signup" className={styles.link}>Sign up</Link>
        </div>
      </nav>
    </header>
  );
}