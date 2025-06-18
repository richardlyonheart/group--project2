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

  // Redirigir si no es un vendedor o no está logueado
  useEffect(() => {
    if (!isLoading && (!user || user.user_choice !== 'seller')) {
      router.push('/login'); // Redirige si no es vendedor
    }
  }, [user, isLoading, router]);

  // Cargar los productos del vendedor cuando el usuario está disponible
  useEffect(() => {
    async function fetchSellerProducts() {
      if (user && user.user_choice === 'seller') {
        setLoadingProducts(true);
        setErrorProducts('');
        try {
          // Crearemos esta API route: /pages/api/user/products
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
  }, [user]); // Dependencia del usuario para recargar cuando el user cambie (ej. al loguearse)

  if (isLoading || (!user || user.user_choice !== 'seller')) {
    // Si isLoading es true, o si no hay user o no es seller, mostraremos algo y la redirección en useEffect se encargará.
    return (
      <div className={styles.loadingContainer}>
        {isLoading ? 'Loading authentication...' : 'Redirecting... Only sellers can access this page.'}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        {/* Asume que el usuario puede tener una profile_picture_url y una bio en la DB */}
        <Image
          src={user.profile_picture_url || '/images/placeholder-artisan.png'} // Placeholder si no hay imagen
          alt={`Profile picture of ${user.name}`}
          width={150}
          height={150}
          className={styles.profilePicture}
        />
        <h1 className={styles.sellerName}>{user.name}</h1>
        <p className={styles.bio}>{user.bio || 'No bio provided yet.'}</p>
        {/* Botón para editar perfil (a futuro) */}
        <button className={styles.editProfileButton}>Edit Profile</button>
      </div>

      <h2 className={styles.productsTitle}>My Products</h2>
      <div className={styles.actionButtons}>
        <Link href="../profile/seller/add-product" className={styles.addProductButton}>
          Add New Product
        </Link>
        {/* El botón de eliminar producto general se implementaría después de la selección */}
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
                src={product.image_url || '/images/placeholder-product.png'}
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