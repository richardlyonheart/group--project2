// src/app/seller/add-product/page.tsx
"use client"; // Este componente necesita ser Client Component por los hooks

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext'; // Importamos el contexto de autenticación
import styles from './add-product.module.css';

export default function AddProductPage() {
  const { user, isLoading } = useAuth(); // Obtén el usuario y el estado de carga
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '', // Por ahora, una URL de imagen
    category: 'jewelry', // Valor por defecto
    stock: '1',
  });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  // Redirigir si no es un vendedor o no está logueado
  if (isLoading) {
    return <div className={styles.loadingContainer}>Loading authentication...</div>;
  }
  if (!user || user.user_choice !== 'seller') {
    router.push('/login'); // Redirige a login si no es un vendedor
    return <div className={styles.redirectingContainer}>Redirecting... Only sellers can add products.</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Adding product...');
    setError('');

    try {
      const response = await fetch('/pages/api/products', { // Crearemos esta ruta de API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          sellerId: user.id, // Pasamos el ID del vendedor autenticado
          price: parseFloat(formData.price), // Convertir precio a número
          stock: parseInt(formData.stock, 10), // Convertir stock a número
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('Product added successfully!');
        console.log('Product added:', data);
        setFormData({ // Limpiar formulario
          name: '',
          description: '',
          price: '',
          imageUrl: '',
          category: 'jewelry',
          stock: '1',
        });
        // Opcional: router.push(`/profile/seller/${user.id}`); para ir al perfil del vendedor
      } else {
        setError(data?.message || 'Failed to add product');
        setStatus('');
      }
    } catch (err) {
      console.error('Error adding product:', err);
      setError('An unexpected error occurred while adding product.');
      setStatus('');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>List a New Product</h1>
      {status && <p className={styles.statusMessage}>{status}</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="description" className={styles.label}>Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className={`${styles.input} ${styles.textarea}`}
          ></textarea>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="price" className={styles.label}>Price ($):</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="imageUrl" className={styles.label}>Image URL:</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="category" className={styles.label}>Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={styles.input}
          >
            <option value="jewelry">Jewelry</option>
            <option value="pottery">Pottery</option>
            <option value="woodwork">Woodwork</option>
            <option value="textiles">Textiles</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="stock" className={styles.label}>Stock Quantity:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            min="1"
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.button}>Add Product</button>
      </form>
    </div>
  );
}