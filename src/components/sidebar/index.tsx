import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useBreakpointValue,
  DrawerProps,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@chakra-ui/react';
import React from 'react';
import { useSidebarContext } from '../../hooks/contexts/sidebar.context-hook';
import SidebarNav from '../sidebar-nav';

function Sidebar() {
  const { isOpen, onClose } = useSidebarContext() as DrawerProps;

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={() => onClose()}>
        <DrawerOverlay>
          <DrawerContent onClick={() => onClose()}>
            <DrawerCloseButton />
            <DrawerHeader />
            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Box as="aside" w="64" mr="8">
      <SidebarNav />
    </Box>
  );
}

export default Sidebar;
