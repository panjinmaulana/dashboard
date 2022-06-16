import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ChakraProvider } from '@chakra-ui/react'
import store from '../store';

import Layout from '../components/Layout';

import '../styles/globals.css';
import '@fontsource/poppins/400.css'; 

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default MyApp
