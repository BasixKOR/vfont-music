import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import 'line-awesome/dist/line-awesome/css/line-awesome.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
