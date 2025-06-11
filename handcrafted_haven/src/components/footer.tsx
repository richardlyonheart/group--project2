// src/components/footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import styles from './footer.module.css';
import facebookIcon from '../../public/images/facebook-fb-social-icon-svgrepo-com.svg';
import twitterIcon from '../../public/images/tweet-twitter-twitter-icon-svgrepo-com.svg';
import instagramIcon from '../../public/images/instagram-socials-social-media-icon-svgrepo-com.svg';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.community}>
        <h2 className={styles.communityTitle}>Join Our Community</h2>
        <p className={styles.communityText}>Buy directly from independent artisans and support their work</p>
      </div>
      <div className={styles.socialIcons}>
        <Link href="#" className={styles.socialLink} aria-label="Facebook">
          <Image src={facebookIcon} alt="Facebook" width={34} height={34} />
        </Link>
        <Link href="#" className={styles.socialLink} aria-label="Twitter">
          <Image src={twitterIcon} alt="Twitter" width={34} height={34} />
        </Link>
        <Link href="#" className={styles.socialLink} aria-label="Instagram">
          <Image src={instagramIcon} alt="Instagram" width={34} height={34} />
        </Link>
      </div>
    </footer>
  );
}