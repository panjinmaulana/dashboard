import { Flex } from '@chakra-ui/react';
import useTheme from '../hooks/useTheme';

import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout({ children }) {
  const { colorTheme } = useTheme();
  return (
    <Flex
      fontFamily='poppins'
      fontSize='sm'
    >
      <Sidebar />
      <Flex
        direction='column'
        w='full'
        h='100vh'
        bg={colorTheme.mainColor}
        overflowY='auto'
      >
        <main>{children}</main>
        <Footer />
      </Flex>
    </Flex>
  )
}