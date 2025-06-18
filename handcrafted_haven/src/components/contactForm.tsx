// src/components/contactForm.tsx
"use client"; 

import { useState } from 'react';
import styles from './contactForm.module.css'; 

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    console.log('Form Data Submitted:', formData);

    try {
      
      setTimeout(() => {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 1500);

    } catch (error) {
      console.error('Error submitting contact form:', error);
      setStatus('An unexpected error occurred.');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Contact Us</h1>
      <p className={styles.subtitle}>We'd love to hear from you!</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>Name:</label>
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
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="subject" className={styles.label}>Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="message" className={styles.label}>Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className={`${styles.input} ${styles.textarea}`}
          ></textarea>
        </div>

        <button type="submit" className={styles.button}>Send Message</button>
        {status && <p className={styles.statusMessage}>{status}</p>}
      </form>
    </div>
  );
}