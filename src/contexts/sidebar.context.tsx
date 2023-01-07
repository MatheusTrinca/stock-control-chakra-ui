import { useDisclosure, UseDisclosureProps } from '@chakra-ui/react';
import { createContext } from 'react';

export const SidebarContext = createContext({} as UseDisclosureProps);

export type SidebarProviderProps = {
  children: React.ReactNode;
};

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const disclosure = useDisclosure();

  return (
    <SidebarContext.Provider value={disclosure}>
      {children}
    </SidebarContext.Provider>
  );
};
