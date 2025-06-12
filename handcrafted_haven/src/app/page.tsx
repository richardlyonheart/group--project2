// src/app/page.tsx
import styles from './page.module.css';
import Header from '../components/header';
import AboutUs from '../components/aboutUs';
import FeaturedArtisans from '../components/featuredArtisans';
import Footer from '../components/footer';
import mainStyles from './main.module.css'; 
export default function Home() {
  return (
    <>
      <main className={mainStyles.hero}>
        <div className={mainStyles.heroContent}>
          <h1 className={mainStyles.heroTitle}>Handcrafted Haven</h1>
          <p className={mainStyles.heroSubtitle}>Discover Unique Handmade Goods</p>
          <button className={mainStyles.heroButton}>Shop Now</button>
        </div>
        {}
      </main>
      <AboutUs />
      <FeaturedArtisans />
    </>
  );
}