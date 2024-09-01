import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import RootLayout from './rootlayout'; // Assuming the file path is correct

export default function Layout({ children }) {
  return (
    <RootLayout>
      
      <main>{children}</main>
      <Footer />
    </RootLayout>
  );
}
