import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import useTheme from '../hooks/useTheme';
import routes from '../routes';

export default function Sidebar() {
  const router = useRouter();
  const { colorTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box
      h='100vh'
      bg={colorTheme.secondColor}
      w={sidebarOpen ? '20%' : '5%'}
      transition='ease-in-out 0.3s'
      fontFamily='poppins'
      fontSize='md'
      display={['none', 'none', 'none', 'block', 'block']}
    >
      <Flex
        justifyContent={sidebarOpen ? 'space-between' : 'flex-end'}
        alignItems='center'
        h={12}
        mx={3}
        mt={2}
      >
        <Heading hidden={!sidebarOpen} fontFamily='poppins'>delman.io</Heading>
        <IconButton
          size='xs'
          fontSize='xs'
          color={colorTheme.textColor}
          icon={sidebarOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          bg={colorTheme.mainColor}
          rounded='full'
          left='23px'
          shadow='xl'
        />
      </Flex>
      <Flex mt={10} justifyContent='center' direction='column' w='100%'>
        {routes.map((route, idx) => {
          return (
            <Link href={route.path} passHref key={idx}>
              <Box>
                <Tooltip
                  label={route.title}
                  placement='right'
                  hasArrow
                  hidden={sidebarOpen}
                  bg={colorTheme.mainColor}
                  color={colorTheme.textColor}
                  ml={-3}
                >
                  <Flex
                    justifyContent='flex-start'
                    gridGap={2}
                    mt={1}
                    w='full'
                    ml={3}
                    alignItems='center'
                    cursor='pointer'
                    color={
                      router.pathname === route.path
                        ? colorTheme.textColor
                        : ''
                    }
                    rounded='md'
                    roundedTopEnd='none'
                    bg={
                      router.pathname === route.path
                        ? colorTheme.mainColor
                        : ''
                    }
                    _hover={{
                      bg: colorTheme.mainColor
                    }}
                    padding={2}
                    fontWeight={
                      router.pathname === route.path ? 'bold' : 'normal'
                    }
                    transition='ease-in-out 0.3s'
                  >
                    <Icon
                      as={route.icon}
                      fontSize='md'
                      fontWeight='semibold'
                    />
                    <Text fontSize='md' hidden={!sidebarOpen}>
                      {route.title}
                    </Text>
                  </Flex>
                </Tooltip>
              </Box>
            </Link>
          );
        })};
      </Flex>
    </Box>
  );
}