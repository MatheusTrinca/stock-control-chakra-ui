import { Stack, Text, Link as ChakraLink } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function SidebarNav() {
  const { asPath } = useRouter();

  return (
    <Stack spacing="6" w="100%">
      <Stack>
        <Text fontSize="xs" fontWeight="bold" color="gray.400">
          CADASTRO
        </Text>
        <Stack>
          <ChakraLink
            as="span"
            _hover={{ bg: 'gray.100' }}
            px="4"
            py="2"
            borderRadius={5}
            bg={asPath === '/' ? 'gray.200' : 'transparent'}
          >
            <Link href="/">
              <Text fontSize="md" fontWeight="medium" color="gray.500">
                PRODUTOS
              </Text>
            </Link>
          </ChakraLink>
        </Stack>
      </Stack>
      <Stack>
        <Text fontSize="xs" fontWeight="bold" color="gray.400">
          ESTOQUE
        </Text>
        <Stack>
          <ChakraLink
            as="span"
            _hover={{ bg: 'gray.100' }}
            px="4"
            py="2"
            borderRadius={5}
            bg={asPath === '/balance' ? 'gray.200' : 'transparent'}
          >
            <Link href="/balance">
              <Text fontSize="md" fontWeight="medium" color="gray.500">
                SALDO
              </Text>
            </Link>
          </ChakraLink>
        </Stack>
        <Stack>
          <ChakraLink
            as="span"
            _hover={{ bg: 'gray.100' }}
            px="4"
            py="2"
            borderRadius={5}
            bg={asPath === '/stock-entries' ? 'gray.200' : 'transparent'}
          >
            <Link href="/stock-entries">
              <Text fontSize="md" fontWeight="medium" color="gray.500">
                ENTRADAS
              </Text>
            </Link>
          </ChakraLink>
        </Stack>
        <Stack>
          <ChakraLink
            as="span"
            _hover={{ bg: 'gray.100' }}
            px="4"
            py="2"
            borderRadius={5}
            bg={asPath === '/stock-outputs' ? 'gray.200' : 'transparent'}
          >
            <Link href="/stock-outputs">
              <Text fontSize="md" fontWeight="medium" color="gray.500">
                SAÍDAS
              </Text>
            </Link>
          </ChakraLink>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default SidebarNav;
