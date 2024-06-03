'use client';
import React, {createContext, useContext, useState, useCallback} from 'react';
import {StripeConnectInstance} from '@stripe/connect-js';
import ToolsPanel from '@/app/components/ToolsPanel';

type IToolsContext = {
  open?: boolean;
  handleOpenChange?: (open: boolean) => void;
};

const ToolsContext = createContext<IToolsContext>({
  open: false,
  handleOpenChange: () => {},
});

export const useToolsContext = () => {
  return useContext(ToolsContext);
};

export const ToolsPanelProvider = ({children}: {children: React.ReactNode}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange = (toolsOpen: boolean) => {
    setOpen(toolsOpen);
  };

  return (
    <ToolsContext.Provider value={{open, handleOpenChange}}>
      {children}
    </ToolsContext.Provider>
  );
};
