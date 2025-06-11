// src/components/aboutUs.tsx
import Image from 'next/image';
import styles from './aboutUs.module.css';
import aboutUsImage from '../../public/images/about-us-image.png'; 

export default function AboutUs() {
  return (
    <section className={styles.aboutUs}>
      <div className={styles.imageContainer}>
        <Image
          src={aboutUsImage}
          alt="Handcrafted items"
          layout="responsive"
          width={500}
          height={400}
          className={styles.image}
        />
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>About Us</h2>
        <p className={styles.description}>
          Handcrafted Haven is a marketplace for artisans to showcase and sell their handmade creations.
          We connect skilled crafters with discerning customers seeking unique, quality products.
        </p>
      </div>
    </section>
  );
}