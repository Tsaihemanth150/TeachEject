import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';
var jwt = require('jsonwebtoken');

const ProductList = ({ products, type }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);


  const makePayment = (productId) => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt.decode(token, process.env.Token_SECERT);
    const id = decodedToken.id;

    const storedProduct = JSON.parse(localStorage.getItem('product'));

    // Check if the stored product is different from the selected product
    if (productId !== storedProduct?._id) {
      // Find the product from the products array using the productId
      const selectedProduct = products.find(product => product._id === productId);
      localStorage.setItem('product', JSON.stringify(selectedProduct));
    }

    localStorage.setItem('userid', JSON.stringify(id));
    router.push(`${process.env.NEXT_PUBLIC_SITE_URL}/payment`);
  };

  return (
    <main>
      <Head>
        <title>Our Products</title>
      </Head>
      {products && (
        <div className="container mx-auto py-8">
          <h1 className="text-3xl text-center font-bold mb-4">{type} Insurance</h1>
          <div className="grid grid-cols-1 mx-10 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products
              .filter(product => product.type === type)
              .map(product => (
                <div key={product._id} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                    <p className="text-gray-600 mb-2">Type: {product.type}</p>
                    <p className="text-gray-600 mb-2">Tier: {product.tier}</p>
                    <p className="text-gray-600 mb-2">Tenure: {product.tenure}</p>
                    <p className="text-gray-600 mb-2">Base Premium: {product.basePremium}</p>
                    <h3 className="text-lg font-semibold mt-4">Coverage Options:</h3>
                    <ul className="list-disc pl-4 mb-2">
                      {product.coverageOptions.map(option => (
                        <li key={option._id} className="text-gray-600">
                          {option.name}: {option.premium}
                        </li>
                      ))}
                    </ul>
                    <h3 className="text-lg font-semibold">Additional Features:</h3>
                    <ul className="list-disc pl-4 mb-2">
                      {product.additionalFeatures.map((feature, index) => (
                        <li key={index} className="text-gray-600">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-200 p-4">
                    {isLoggedIn ? (
                      <button onClick={() => makePayment(product._id)}>Buy Now</button>
                    ) : (
                      <Link href="/login">
                        <button className="text-blue-500 ">Login to Buy</button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </main>
  );
};

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/prodcuts/getProdcuts`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    const products = data.data || [];
    const { type } = params;

    return { props: { products, type } };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return { props: { products: null, type: null, error: true } };
  }
}

export default ProductList;
