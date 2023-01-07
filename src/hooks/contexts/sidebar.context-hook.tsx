import { useContext } from 'react';
import { SidebarContext } from '../../contexts/sidebar.context';

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error('useSidebarContext requires SidebarProvider');
  return context;
};
