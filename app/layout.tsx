/* eslint-disable @next/next/no-page-custom-font */

import bottomBackground from '@/public/images/bottomBackground.svg';
import bottomBackgroundMobile from '@/public/images/bottomBackgroundMobile.svg';
import type { Metadata } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import '../styles/globals.scss';
import ReactQueryProvider from './Providers';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <div className="bottom-background-wrapper">
          <Image
            src={bottomBackground}
            className="bottom-background-img"
            alt="bottom background"
            priority
          />
        </div>
        <div className="bottom-background-wrapper-mobile">
          <Image
            src={bottomBackgroundMobile}
            className="bottom-background-img"
            alt="bottom background"
            priority
          />
        </div>
      </body>
    </html>
  );
}
