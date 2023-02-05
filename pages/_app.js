import { SessionProvider } from 'next-auth/react';

import { StoreProvider } from '../context/Store';

import '../styles/globals.css'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
