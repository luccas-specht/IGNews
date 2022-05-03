//ever time when the page is loaded or changed, the app will be rendered and ir will be passed the page props

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import { Header } from '../components';

import '../styles/global.scss';

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => (
  <SessionProvider session={session}>
    <Header />
    <Component {...pageProps} />
  </SessionProvider>
);

export default MyApp;
