import Link from 'next/link';
import Image from 'next/image';

import {
  Flex,
  Button,
} from '@chakra-ui/react';
import useTheme from '../hooks/useTheme';

export default function PageNotFound() {
  const { colorTheme } = useTheme();

  return (
    <Flex
      p='3%'
      width='full'
      direction='column'
      justifyContent='center'
      alignItems='center'
    >
      <Image src='/../img/404.svg' width='300' height='300' alt='404 not found' />
      <Link href='/dashboard'>
        <Button
          mt={7}
          bg={colorTheme.secondColor}
          type='submit'
          w={124}
        >
          Back
        </Button>
      </Link>
    </Flex>
  );
};