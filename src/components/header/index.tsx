import {
  Avatar,
  Flex,
  HStack,
  IconButton,
  Text,
  useBreakpointValue,
  Icon,
} from '@chakra-ui/react';
import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { useSidebarContext } from '../../hooks/contexts/sidebar.context-hook';

function Header() {
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  const { onOpen, onClose } = useSidebarContext();

  return (
    <Flex
      as="header"
      w="100%"
      maxW={1120}
      h="20"
      mx="auto"
      px="2"
      py="2"
      align="center"
      boxShadow="0 1px 0 #ccc"
      color="gray.500"
      fontWeight="bold"
    >
      {isMobile && (
        <IconButton
          icon={<Icon as={FiMenu} />}
          onClick={onOpen}
          variant="unstyled"
          fontSize="20"
          mr="2"
          aria-label="Mobile Menu"
        />
      )}
      <Text>LOGO</Text>
      <Flex ml="auto">
        <HStack>
          <Text>Matheus Felipe</Text>
          <Avatar size="md" name="matheus felipe" bg="gray.500" />
        </HStack>
      </Flex>
    </Flex>
  );
}

export default Header;
