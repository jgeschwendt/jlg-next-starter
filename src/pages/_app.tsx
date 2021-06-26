import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

const theme = extendTheme({
  styles: {
    global: {
      // eslint-disable-next-line @typescript-eslint/naming-convention -- css
      'html, body, #__next': {
        height: '100%',
      },
    },
  },
});

// eslint-disable-next-line @typescript-eslint/naming-convention -- next api
const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <ChakraProvider theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>
);

export default App;
