import { useEffect, useState } from 'react';

import {
  Flex,
  Box,
  Heading,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useToast,
  Divider,
  Stack
} from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs';

import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../store/actions/users';

import useTheme from '../hooks/useTheme';

export default function Registration() {
  const { colorTheme } = useTheme();

  const toast = useToast();
  const [filteredData, setFilteredData] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  function handleSearchByEmail(e) {
    const dataBySearch = users.data.filter((el) => el.email == e.target.value);

    setFilteredData(...dataBySearch);
  };

  function handleViewUserProfile(data) {
    handleClick();
  };

  const handleClick = () => {
    onOpen();
  };

  function handleDeleteUser() {
    fetch('https://delman-fe-api.fly.dev/users/' + filteredData?.id, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(res =>
        toast({
          title: res.message,
          position: 'top',
          status: 'success',
          variant: 'left-accent',
          isClosable: true,
        }));
        onClose();
  };

  return (
    <>
      <Flex
        p='3%'
        width='full'
        direction='column'
      >
        <Box textAlign='left' w='100%'>
          <Heading fontFamily='poppins'>Search User</Heading>
          <Text as='b' color='facebook.500'>Search existing user</Text>
          <Divider my={2} />
        </Box>
        <Box w='50%'>
          <Box my={2}>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<BsSearch />}
              />
              <Input
                type='text'
                placeholder='Search by email'
                onChange={handleSearchByEmail}
                borderColor='#CBD5E0'
              />
            </InputGroup>
          </Box>

          <Box my={4} style={{ border: '1px solid #CBD5E0', borderRadius: '0.375rem' }}>
            {filteredData?.id ?
              <Flex direction='column' justifyContent='center' alignItems='center' h='300'>
                <Heading fontFamily='poppins' fontSize='4xl'>{filteredData?.name}</Heading>
                <Text>{filteredData?.email}</Text>
                <Divider width='50%' my={2} />
                <Button
                  bg={colorTheme.secondColor}
                  type='button'
                  onClick={handleViewUserProfile}
                >
                  View User Profile
                </Button>
              </Flex> :
              <>
                <Flex direction='column' justifyContent='center' alignItems='center' h='300'>
                  <Heading fontFamily='poppins' size='lg'>
                    No result was found
                  </Heading>
                  <Text>
                    Please try again with different email
                  </Text>
                </Flex>
              </>
            }
          </Box>
        </Box>
      </Flex>

      <Drawer onClose={onClose} isOpen={isOpen} size='md'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontFamily='poppins' fontSize='sm'>
            <Heading fontFamily='poppins' fontSize='2xl'>User Details</Heading>
            <Text
              fontSize='xs'
            >
              This is inquiry about user with email: {filteredData?.email?.toLowerCase()}
            </Text>
          </DrawerHeader>
          <hr />
          <DrawerBody overflowX='hidden' fontFamily='poppins' fontSize='sm'>
            <Flex>
              <Box><Text w='134px'>ID</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.id}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Name</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.name}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Email</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.email}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Country Name</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.country_name}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Device ID</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.device_id}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Bitcoin Address</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.bitcoin_address}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Avatar</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text w='50%'>{filteredData?.avatar}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Login IP</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.login_ip}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Active Device Mac</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.active_device_mac}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Notes</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.notes}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Age</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.age}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Referral ID</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.referral_id}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Locale</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.locale}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Favorite Music</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.favorite_music}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Phone Number</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.phone_number}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Twitter Number</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.twitter_username}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Job</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.job}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Invoice Email</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.invoice_email_address}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>HMAC Secret</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.hmac_secret}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Favorite Qoute</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.favorite_quote}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Primary Color</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.primary_color}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Secondary Color</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.secondary_color}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Material</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.material}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Shipping Address</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.shipping_address}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Zip Code</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.zip_code}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Latitude</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.latitude}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Longitude</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.longitude}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Favorite Animal</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.favorite_animal}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>APP Version</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.app_version}</Text></Box>
            </Flex>
            <Flex>
              <Box><Text w='134px'>Timezone</Text></Box>
              <Box><Text mr={3}>:</Text></Box>
              <Box><Text>{filteredData?.timezone}</Text></Box>
            </Flex>
          </DrawerBody>
          <hr />
          <DrawerFooter fontFamily='poppins' fontSize='sm'>
            <Stack spacing='270px' direction='row'>
              <Button
                color={colorTheme.secondColor}
                variant='ghost'
                onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={handleDeleteUser}>
                Delete User
              </Button>
            </Stack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};