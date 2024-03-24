import React, {createContext, useContext} from 'react';

type ColorMode = 'light' | 'dark';

type IColorModeContext = {
  mode: ColorMode;
  handleModeChange: (mode: ColorMode) => void;
};

const ColorModeContext = createContext<IColorModeContext>({
  mode: 'light',
  handleModeChange: () => {},
});

export const useColorMode = () => {
  return useContext(ColorModeContext);
};

// 0: light, 1: dark
export const getCurrentColorMode = (): ColorMode =>
  Boolean(Number(window.localStorage.getItem('colorMode'))) ? 'dark' : 'light';

export const ColorModeProvider = ({children}: {children: React.ReactNode}) => {
  const [mode, setMode] = React.useState<ColorMode>(getCurrentColorMode());

  const handleModeChange = (mode: ColorMode) => {
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
