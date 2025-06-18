// src/app/profile/seller/[sellerId]/page.tsx
import { notFound } from 'next/navigation';
import styles from './sellerProfile.module.css'; 
import Image from 'next/image';

interface SellerProfilePageProps {
  params: {
    sellerId: string;
  };
}

const mockSellerData = {
  '5': { 
    id: '1',
    name: 'Artisan A',
    bio: 'Passionate artisan specializing in handmade jewelry using recycled materials. Each piece tells a unique story.',
    profilePicture: '/images/placeholder-artisan.png',
    products: [
      { id: 'p1', name: 'Recycled silver necklace', imageUrl: '/images/placeholder-product.png', price: '75.00' },
      { id: 'p2', name: 'Forged copper earrings', imageUrl: '/images/placeholder-product.png', price: '45.00' },
    ],
  },
  '2': { 
    id: '2',
    name: 'Ceramista B',
    bio: 'Creando piezas de cerámica utilitaria y decorativa, inspiradas en la naturaleza y la cultura local. Toda mi cerámica es apta para alimentos.',
    profilePicture: '/images/placeholder-artisan.png',
    products: [
      { id: 'p3', name: 'Taza de barro esmaltada', imageUrl: '/images/placeholder-product.png', price: '25.00' },
      { id: 'p4', name: 'Set de cuencos de cerámica', imageUrl: '/images/placeholder-product.png', price: '90.00' },
      { id: 'p5', name: 'Jarrón decorativo', imageUrl: '/images/placeholder-product.png', price: '60.00' },
    ],
  },
};

export default async function SellerProfilePage({ params }: { params: Promise<{ sellerId: string }> }) {
  const resolvedParams = await params; 
  const { sellerId } = resolvedParams;
  
  const sellerData = mockSellerData[sellerId as keyof typeof mockSellerData];

  if (!sellerData) {
    notFound(); 
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <Image
          src={sellerData.profilePicture}
          alt={`Profile picture of ${sellerData.name}`}
          width={150}
          height={150}
          className={styles.profilePicture}
        />
        <h1 className={styles.sellerName}>{sellerData.name}</h1>
        <p className={styles.bio}>{sellerData.bio}</p>
      </div>

      <h2 className={styles.productsTitle}>My Products</h2>
      <div className={styles.productsGrid}>
        {sellerData.products.map(product => (
          <div key={product.id} className={styles.productCard}>
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={200}
              height={150}
              className={styles.productImage}
            />
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}