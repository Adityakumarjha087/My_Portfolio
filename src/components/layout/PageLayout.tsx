import Head from 'next/head';
import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

type PageLayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
};

export const PageLayout = ({
  children,
  title = 'Aditya | Full Stack Developer',
  description = 'Personal portfolio of Aditya - Full Stack Developer',
}: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      
      <main className="relative z-10">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};
