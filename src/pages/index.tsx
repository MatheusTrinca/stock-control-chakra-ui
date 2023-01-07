import {
  Box,
  Button,
  Flex,
  Input,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Product } from '../application/entities/product';

import Header from '../components/header';
import Sidebar from '../components/sidebar';

function Products() {
  const [name, setName] = useState('');
  const [listProducts, setListProducts] = useState<Product[]>([]);

  useEffect(() => {
    const db_products: Product[] = localStorage.getItem('db_products')
      ? JSON.parse(localStorage.getItem('db_products') || '')
      : [];
    setListProducts(db_products);
  }, []);

  function handleNewProduct() {
    if (!name) return;
    if (verifyProductName()) {
      alert('Produto já cadastrado');
      return;
    }
    const id = Math.random().toString(36).substring(2);

    if (listProducts && listProducts.length > 0) {
      localStorage.setItem(
        'db_products',
        JSON.stringify([...listProducts, { id, name }])
      );
    } else {
      localStorage.setItem('db_products', JSON.stringify([{ id, name }]));
    }
    setName('');
    setListProducts(prevState => [...prevState, { id, name }]);
  }

  function removeProducts(id: string) {
    const db_stock_outputs: Product[] = localStorage.getItem('db_stock_outputs')
      ? JSON.parse(localStorage.getItem('db_stock_outputs') || '')
      : [];
    const db_stock_entries: Product[] = localStorage.getItem('db_stock_entries')
      ? JSON.parse(localStorage.getItem('db_stock_entries') || '')
      : [];

    const hasOutputs =
      db_stock_outputs.filter(item => item.name === name).length > 0;
    const hasEntries =
      db_stock_entries.filter(item => item.name === name).length > 0;

    if (hasEntries || hasOutputs) {
      alert('Produto em movimentação');
      return;
    }
    const newArray = listProducts.filter(item => item.id !== id);

    localStorage.setItem('db_products', JSON.stringify(newArray));

    setListProducts(newArray);
  }

  function verifyProductName() {
    return !!listProducts.find(product => product.name === name);
  }

  return (
    <Flex h="100vh" flexDirection="column">
      <Header />
      <Flex w="100%" my="6" maxW={1120} mx="auto" px="6" h="100vh">
        <Sidebar />
        <Box w="100%">
          <SimpleGrid minChildWidth={240} h="fit-content" spacing="6">
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Nome do produto"
            />
            <Button w="40" onClick={handleNewProduct}>
              CADASTRAR
            </Button>
          </SimpleGrid>
          <Box overflowY="auto" height="80vh">
            <Table>
              <Thead>
                <Tr>
                  <Th fontWeight="bold" fontSize={14}>
                    Nome
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {listProducts.map(({ name, id }) => (
                  <Tr key={id}>
                    <Td color="gray.500">{name}</Td>
                    <Td textAlign="end">
                      <Button
                        color="red.500"
                        p="2"
                        h="auto"
                        fontSize={11}
                        fontWeight="bold"
                        onClick={() => removeProducts(id)}
                      >
                        DELETAR
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Products;

// 30:12
