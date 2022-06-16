import { useState } from 'react'
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  useToast,
  Divider,
  Text,
  chakra,
  Spacer
} from '@chakra-ui/react'
import { MdError } from 'react-icons/md';

import useTheme from '../hooks/useTheme';

export default function Registration() {
  const { colorTheme } = useTheme();

  const toast = useToast();
  const [input, setInput] = useState({
    name: '',
    email: '',
  })

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value })
  }

  function validateEmail(value) {
    let error
    if (!value) {
      error = 'Please provide email'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Please provide a valid email';
    }
    return error
  }

  const isErrorName = input.name === ''

  function handleSubmit() {
    fetch('https://delman-fe-api.fly.dev/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })
      .then(response => response.json())
      .then(data => {
        if (data.data) {
          toast({
            title: data.message,
            position: 'top',
            status: 'success',
            variant: 'left-accent',
            isClosable: true,
          })
        } else {
          toast({
            title: data.message,
            position: 'top',
            status: 'error',
            variant: 'left-accent',
            isClosable: true,
          })
        }
      })
      .catch((error) =>
        toast({
          title: error.message,
          position: 'top',
          status: 'error',
          variant: 'left-accent',
          isClosable: true,
        }));
  };

  return (
    <Flex
      p='3%'
      width='full'
      direction='column'
    >
      <Box textAlign='left' w='100%'>
        <Heading fontFamily='poppins'>User Registration</Heading>
        <Text as='b' color='facebook.500'>Add new User</Text>
        <Divider my={2} />
      </Box>
      <Box textAlign='left' w='30%'>
        <FormControl isInvalid={isErrorName} mb={4}>
          <FormLabel htmlFor='name' color={isErrorName ? 'red.500' : '#1A202C'}>Name</FormLabel>
          <Input
            id='name'
            name='name'
            type='text'
            onChange={handleInputChange}
            borderColor={colorTheme.secondColor}
          />
          {isErrorName && (
            <FormErrorMessage><MdError /><chakra.span ms={1}></chakra.span>Please provide name</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={validateEmail(input.email)}>
          <FormLabel htmlFor='email' color={validateEmail(input.email) ? 'red.500' : '#1A202C'}>Email</FormLabel>
          <Input
            id='email'
            name='email'
            type='email'
            onChange={handleInputChange}
            borderColor={colorTheme.secondColor}
          />
          <FormErrorMessage><MdError /><chakra.span ms={1}>{validateEmail(input.email)}</chakra.span></FormErrorMessage>
        </FormControl>
        <Flex justifyContent='end'>
          <Button
            mt={7}
            bg={colorTheme.secondColor}
            type='submit'
            disabled={!isErrorName && !validateEmail(input.email) ? false : true}
            onClick={handleSubmit}
            textAlign='right'
            w={124}
          >
            Submit
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};