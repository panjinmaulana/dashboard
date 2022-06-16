import {
  Box,
  chakra,
  Container,
  Flex,
  Stack,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react';
import useTheme from '../hooks/useTheme';

import { SiGmail } from 'react-icons/si';
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';

function SocialButton({ children, label, href }) {
  const { colorTheme } = useTheme();

  return (
    <chakra.button
      bg={colorTheme.mainColor}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: colorTheme.secondColor,
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  const { colorTheme } = useTheme();

  return (
    <Flex
      direction='column'
      marginTop='auto'
      fontFamily='poppins'
      fontSize='sm'
      fontWeight='bold'
      font
    >
      <Box
        bg={colorTheme.secondColor}
        color={colorTheme.textColor}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Text>
            Copyright ©
            {` ${new Date().getFullYear()} `}
            Created by
            <a
              href="mailto: panjinmaulana@gmail.com"
            >
              {' '}Panji Maulana
            </a>
          </Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Gmail'} href={'mailto: panjinmaulana@gmail.com'}>
              <SiGmail />
            </SocialButton>
            <SocialButton label={'LinkedIn'} href={'https://linkedin.com/in/panji-maulana/'}>
              <AiFillLinkedin />
            </SocialButton>
            <SocialButton label={'Github'} href={'https://github.com/panjinmaulana'}>
              <AiFillGithub />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Flex>
  )
}