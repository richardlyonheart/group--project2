// src/components/featuredArtisans.tsx
import Image from 'next/image';
import Link from 'next/link';
import styles from './featuredArtisans.module.css';

const featuredArtisans = [
  {
    name: 'Sarah Garter',
    image: '/images/artisan-placeholder.png',
    profileUrl: '/artisans/sarah-garter',
    product: 'Woven Basket',
  },
  {
    name: 'Ceramic Pottery',
    image: '/images/artisan-placeholder.png',
    profileUrl: '/artisans/ceramic-pottery',
    product: 'Handmade Pottery Set',
  },
  {
    name: 'Caroline Nicklass',
    image: '/images/artisan-placeholder.png',
    profileUrl: '/artisans/caroline-nicklass',
    product: 'Beaded Necklace',
  },
];

export default function FeaturedArtisans() {
  return (
    <section className={styles.featuredArtisans}>
      <h2 className={styles.title}>Featured Artisans</h2>
      <div className={styles.artisansGrid}>
        {featuredArtisans.map((artisan) => (
          <div key={artisan.name} className={styles.artisanCard}>
            <div className={styles.imageContainer}>
              <Image
                src={artisan.image}
                alt={artisan.product}
                layout="responsive"
                width={200}
                height={250}
                className={styles.image}
              />
            </div>
            <h3 className={styles.artisanName}>{artisan.name}</h3>
            <Link href={artisan.profileUrl} className={styles.viewProfile}>
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}