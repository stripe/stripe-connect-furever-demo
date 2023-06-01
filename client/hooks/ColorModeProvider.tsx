import React, {createContext, useContext} from 'react';

type IColorModeContext = {
  mode: 'light' | 'dark';
  handleModeChange: (mode: 'light' | 'dark') => void;
};

const ColorModeContext = createContext<IColorModeContext>({
  mode: 'light',
  handleModeChange: () => {},
});

export const useColorMode = () => {
  return useContext(ColorModeContext);
};

export const ColorModeProvider = ({children}: {children: React.ReactNode}) => {
  // 0: light, 1: dark
  const [mode, setMode] = React.useState<'light' | 'dark'>(
    Boolean(Number(window.localStorage.getItem('colorMode'))) ? 'dark' : 'light'
  );

  const handleModeChange = (mode: 'light' | 'dark') => {
    if (mode === 'light') {
      window.localStorage.setItem('colorMode', '0');
      setMode('light');
    } else {
      window.localStorage.setItem('colorMode', '1');
      setMode('dark');
    }
  };

  return (
    <ColorModeContext.Provider value={{mode, handleModeChange}}>
      {children}
    </ColorModeContext.Provider>
  );
};
