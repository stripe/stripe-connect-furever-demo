'use client';
import React, {createContext, useContext, useState} from 'react';
import {StripeConnectInstance} from '@stripe/connect-js';
import ToolsPanel from '@/app/components/ToolsPanel';

type IToolsContext = {
  open?: boolean;
  handleOpenChange?: (open: boolean) => void;
};

const ToolsContext = createContext<IToolsContext>({
  open: true,
  handleOpenChange: () => {},
});

export const useToolsContext = () => {
  return useContext(ToolsContext);
};

export const ToolsPanelProvider = ({children}: {children: React.ReactNode}) => {
  const [open, setOpen] = useState<boolean>(true);
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return (
    <ToolsContext.Provider value={{open, handleOpenChange}}>
      <ToolsPanel />
      {children}
    </ToolsContext.Provider>
  );
};
