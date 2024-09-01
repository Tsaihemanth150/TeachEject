import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Products = () => {
  return (
    <div>
      <Head>
        <title>Insurance Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl text-center font-bold mb-4">Insurance Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProductCard title="Health" image="/health.jpeg" />
          <ProductCard title="Life" image="/life.jpeg" />
          <ProductCard title="Property" image="/property.jpeg" />
          <ProductCard title="Auto" image="/auto.jpeg" />
          <ProductCard title="Travel" image="/travel.jpeg" />
          <ProductCard title="Business" image="/business.jpeg" />
        </div>
      </main>
    </div>
  );
};

const ProductCard = ({ title, image }) => {
  const router = useRouter();
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLogged(true);
    }
  }, []);

  const handleBuyNow = () => {
    
    const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
    router.push(`/prodcut/${capitalizedTitle}`);
  };

  const handleLogin = () => {
    // Implement your login logic here
    router.push('/login');
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title} Insurance</h2>
        {isLogged ? (
          <button onClick={handleBuyNow} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Buy Now
          </button>
        ) : (
          <div className="mt-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Buy Now</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>To Proceed Further Login Into your account</AlertDialogTitle>
                  <AlertDialogDescription>
                    You need to login to your account to proceed further.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogin}>Login</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
