import { AppProps } from 'next/app';
import '../styles/globals.scss';

const MyApp = function ({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
};

export default MyApp;
