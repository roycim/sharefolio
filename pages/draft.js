import React from 'react';
import Head from 'next/head';
import DraftLayout from '../components/DraftLayout';

export default function Draft() {
  return (
    <>
      <Head>
        <title>Draft - Sharefolio</title>
        <meta name="description" content="Draft interface for portfolio content" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DraftLayout />
    </>
  );
}
