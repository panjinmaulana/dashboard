import { extendTheme, useColorModeValue } from '@chakra-ui/react';

export default function useTheme() {
  const chakraTheme = extendTheme({
    font: {
      body: 'Poppins',
    },
    sizes: {
      sm: '60px',
    },
  });

  const mainColor = useColorModeValue('gray.100', 'gray.800');
  const secondColor = useColorModeValue('gray.300', 'gray.700');
  const textColor = useColorModeValue('blackAlpha.800', 'whiteAlpha.800');
  const borderColor = useColorModeValue('blackAlpha.500', 'whiteAlpha.500');

  const colorTheme = {
    mainColor,
    secondColor,
    textColor,
    borderColor,
  };

  return { chakraTheme, colorTheme };
};
