// src/app/dashboard/seller/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import Image from 'next/image';
import Link from 'next/link';
import styles from './sellerDashboard.module.css'; 

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
}

const formatPrice = (price: any) => `$${parseFloat(price || '0').toFixed(2)}`;

export default function SellerDashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState('');

  
  useEffect(() => {
    if (!isLoading && (!user || user.user_choice !== 'seller')) {
      router.push('/login'); 
    }
  }, [user, isLoading, router]);

  
  useEffect(() => {
    async function fetchSellerProducts() {
      if (user && user.user_choice === 'seller') {
        setLoadingProducts(true);
        setErrorProducts('');
        try {
          
          const response = await fetch('/pages/api/user/products');
          const data = await response.json();

          if (response.ok) {
            setSellerProducts(data.products);
          } else {
            setErrorProducts(data?.message || 'Failed to fetch products');
          }
        } catch (err) {
          console.error('Error fetching seller products:', err);
          setErrorProducts('An unexpected error occurred while fetching products.');
        } finally {
          setLoadingProducts(false);
        }
      }
    }
    fetchSellerProducts();
  }, [user]); 

  if (isLoading || (!user || user.user_choice !== 'seller')) {
    
    return (
      <div className={styles.loadingContainer}>
        {isLoading ? 'Loading authentication...' : 'Redirecting... Only sellers can access this page.'}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        
        <Image
          src={user.profile_picture_url || '/images/artisan-placeholder.png'} 
          alt={`Profile picture of ${user.name}`}
          width={150}
          height={150}
          className={styles.profilePicture}
        />
        <h1 className={styles.sellerName}>{user.name}</h1>
        <p className={styles.bio}>{user.bio || 'No bio provided yet.'}</p>
        
        <button className={styles.editProfileButton}>Edit Profile</button>
      </div>

      <h2 className={styles.productsTitle}>Your Products</h2>
      <div className={styles.actionButtons}>
        <Link href="../profile/seller/add-product" className={styles.addProductButton}>
          Add New Product
        </Link>
        
      </div>

      {loadingProducts ? (
        <p className={styles.loadingMessage}>Loading your products...</p>
      ) : errorProducts ? (
        <p className={styles.errorMessage}>{errorProducts}</p>
      ) : sellerProducts.length === 0 ? (
        <p className={styles.noProductsMessage}>You haven't listed any products yet.</p>
      ) : (
        <div className={styles.productsGrid}>
          {sellerProducts.map(product => (
            <div key={product.id} className={styles.productCard}>
              <Image
                src={product.image_url || '/images/White-Cup-PNG.png'}
                alt={product.name}
                width={200}
                height={150}
                className={styles.productImage}
              />
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productPrice}>{formatPrice(product.price)}</p>
              <div className={styles.productActions}>
                <button className={styles.editButton}>Edit</button>
                <button className={styles.deleteButton}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}