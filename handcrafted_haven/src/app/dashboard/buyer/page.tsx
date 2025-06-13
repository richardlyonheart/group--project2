// src/app/dashboard/buyer/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import Image from 'next/image';
import Link from 'next/link';
import styles from './buyerDashboard.module.css'; 

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  seller_name?: string; // Para el vendedor del producto
}

export default function BuyerDashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [purchasedItems, setPurchasedItems] = useState<Product[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [errorItems, setErrorItems] = useState('');

  // Redirigir si no es un comprador o no está logueado
  useEffect(() => {
    if (!isLoading && (!user || user.user_choice !== 'buyer')) {
      router.push('/login'); // Redirige si no es comprador
    }
  }, [user, isLoading, router]);

  // Cargar los artículos comprados/en carrito del comprador
  useEffect(() => {
    async function fetchBuyerItems() {
      if (user && user.user_choice === 'buyer') {
        setLoadingItems(true);
        setErrorItems('');
        try {
          // Crearemos esta API route: /pages/api/user/purchases (o cart)
          // Por ahora, usamos datos de prueba
          const mockPurchases = [
            { id: 'buy1', name: 'Ceramic Mug', price: 22.50, image_url: '/images/placeholder-product.png', seller_name: 'Artisan A' },
            { id: 'buy2', name: 'Handwoven Scarf', price: 65.00, image_url: '/images/placeholder-product.png', seller_name: 'Textile Artist' },
            { id: 'buy3', name: 'Wooden Coasters (Set of 4)', price: 30.00, image_url: '/images/placeholder-product.png', seller_name: 'Woodwork Wonders' },
          ];
          setPurchasedItems(mockPurchases);
          // const response = await fetch('/pages/api/user/purchases');
          // const data = await response.json();
          // if (response.ok) {
          //   setPurchasedItems(data.items);
          // } else {
          //   setErrorItems(data?.message || 'Failed to fetch items');
          // }
        } catch (err) {
          console.error('Error fetching buyer items:', err);
          setErrorItems('An unexpected error occurred while fetching items.');
        } finally {
          setLoadingItems(false);
        }
      }
    }
    fetchBuyerItems();
  }, [user]);

  if (isLoading || (!user || user.user_choice !== 'buyer')) {
    return (
      <div className={styles.loadingContainer}>
        {isLoading ? 'Loading authentication...' : 'Redirecting... Only buyers can access this page.'}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <Image
          src={user.profile_picture_url || '@/images/placeholder-artisan.png'} // Placeholder si no hay imagen
          alt={`Profile picture of ${user.name}`}
          width={150}
          height={150}
          className={styles.profilePicture}
        />
        <h1 className={styles.buyerName}>Welcome, {user.name}!</h1>
        <p className={styles.bio}>{user.bio || 'No bio provided yet.'}</p>
        {/* Botón para editar perfil (a futuro) */}
        <button className={styles.editProfileButton}>Edit Profile</button>
      </div>

      <h2 className={styles.sectionTitle}>Your Purchased Items</h2>
      {loadingItems ? (
        <p className={styles.loadingMessage}>Loading your items...</p>
      ) : errorItems ? (
        <p className={styles.errorMessage}>{errorItems}</p>
      ) : purchasedItems.length === 0 ? (
        <p className={styles.noItemsMessage}>You haven't purchased any items yet. Start exploring!</p>
      ) : (
        <div className={styles.itemsGrid}>
          {purchasedItems.map(item => (
            <div key={item.id} className={styles.itemCard}>
              <Image
                src={item.image_url || '/images/placeholder-product.png'}
                alt={item.name}
                width={150}
                height={120}
                className={styles.itemImage}
              />
              <h3 className={styles.itemName}>{item.name}</h3>
              <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
              {item.seller_name && <p className={styles.itemSeller}>by {item.seller_name}</p>}
              {/* Aquí puedes añadir un botón "Leave Review" (a futuro) */}
            </div>
          ))}
        </div>
      )}

      {/* Puedes añadir una sección para el carrito de compras más adelante si es diferente de compras */}
      {/* <h2 className={styles.sectionTitle}>Your Cart</h2> */}
      {/* ... */}
    </div>
  );
}