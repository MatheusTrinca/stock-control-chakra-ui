import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { ListProduct } from '../application/entities/list-product';
import { Product } from '../application/entities/product';
import { StockEntry } from '../application/entities/stock-entry';
import Header from '../components/header';
import Sidebar from '../components/sidebar';

function Balance() {
  const [listProducts, setListProducts] = useState<ListProduct[]>([]);
  const [filteredProduct, setFilteredProduct] = useState('');
  const [cmbProducts, setCmbProducts] = useState<ListProduct[]>([]);

  useEffect(() => {
    BuildBalanceArray();
  }, []);

  function handleFilterProducts() {
    if (!filteredProduct) {
      setListProducts(cmbProducts);
      return;
    }
    const newArray = cmbProducts.filter(
      item => item.product_id === filteredProduct
    );

    setListProducts(newArray);
  }

  function BuildBalanceArray() {
    const db_stock_entries = localStorage.getItem('db_stock_entries')
      ? JSON.parse(localStorage.getItem('db_stock_entries') || '')
      : [];
    const db_stock_outputs = localStorage.getItem('db_stock_outputs')
      ? JSON.parse(localStorage.getItem('db_stock_outputs') || '')
      : [];
    const db_products = localStorage.getItem('db_products')
      ? JSON.parse(localStorage.getItem('db_products') || '')
      : [];

    const newArray: ListProduct[] = [];

    db_products.map((prod: Product) => {
      const entries = db_stock_entries
        .filter((item: StockEntry) => item.product_id === prod.id)
        .map((entry: StockEntry) => Number(entry.amount))
        .reduce((acc: number, curr: number) => acc + curr, 0);

      const outputs = db_stock_outputs
        .filter((item: StockEntry) => item.product_id === prod.id)
        .map((entry: StockEntry) => Number(entry.amount))
        .reduce((acc: number, curr: number) => acc + curr, 0);

      const total = Number(entries) - Number(outputs);

      newArray.push({
        product_id: prod.id,
        product_name: prod.name,
        amount: total,
      });
    });
    setListProducts(newArray);
    setCmbProducts(newArray);
  }

  return (
    <Flex h="100vh" flexDirection="column">
      <Header />
      <Flex w="100%" my="6" maxW={1120} mx="auto" px="6" h="100vh">
        <Sidebar />
        <Box w="100%">
          <SimpleGrid minChildWidth={240} h="fit-content" spacing="6">
            <Select
              value={filteredProduct}
              onChange={e => setFilteredProduct(e.target.value)}
            >
              <option value="0">Selecione um item</option>
              {cmbProducts &&
                cmbProducts.length > 0 &&
                cmbProducts.map(item => (
                  <option key={item.product_id} value={item.product_id}>
                    {item.product_name}
                  </option>
                ))}
            </Select>
            <Input
              placeholder="Quantidade"
              type="number"
              value={filteredProduct}
              onChange={e => setFilteredProduct(e.target.value)}
            />
            <Button w="40" onClick={handleFilterProducts}>
              FILTRAR
            </Button>
          </SimpleGrid>

          <Box overflowY="auto" height="80vh">
            <Table>
              <Thead>
                <Tr>
                  <Th fontWeight="bold" fontSize={14}>
                    Nome
                  </Th>
                  <Th fontWeight="bold" fontSize={14}>
                    Qtd.
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {listProducts.map((item, i) => (
                  <Tr key={i}>
                    <Td color="gray.500">{item.product_name}</Td>
                    <Td color="gray.500">{item.amount}</Td>
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

export default Balance;
