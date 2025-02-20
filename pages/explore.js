import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Explore() {
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  async function fetchPortfolios() {
    try {
      const res = await fetch('/api/portfolios');
      const data = await res.json();
      setPortfolios(data.portfolios || []);
    } catch (err) {
      console.error('Error fetching portfolios:', err);
    }
  }

  return (
    <>
      <Head>
        <title>Explore - Sharefolio</title>
        <meta name="description" content="Discover public portfolios" />
      </Head>
      <Layout>
        <div className="text-foreground">
          <h1 className="text-3xl font-bold mb-4">Explore Portfolios</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.length === 0 ? (
              <p className="text-muted-foreground">No portfolios to show.</p>
            ) : (
              portfolios.map((portfolio) => (
                <Link 
                  key={portfolio.id} 
                  href={`/portfolio/${portfolio.id}`}
                  className="block p-4 bg-popover rounded hover:bg-popover/80 transition"
                >
                  <h2 className="text-xl font-semibold">{portfolio.name}</h2>
                  <p className="text-sm text-muted-foreground">{portfolio.description}</p>
                </Link>
              ))
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
