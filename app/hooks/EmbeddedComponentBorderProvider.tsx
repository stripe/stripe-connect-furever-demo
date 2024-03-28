import React, {createContext, useContext, useState} from 'react';

type IEmbeddedComponentBorderContext = {
  enableBorder: boolean;
  handleEnableBorderChange: (enableBorder: boolean) => void;
};

const EmbeddedComponentBorderContext =
  createContext<IEmbeddedComponentBorderContext>({
    enableBorder: false,
    handleEnableBorderChange: () => {},
  });

export const useEmbeddedComponentBorder = () => {
  return useContext(EmbeddedComponentBorderContext);
};

export const EmbeddedComponentBorderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [enableBorder, setEnableBorder] = useState<boolean>(
    Boolean(Number(window.localStorage.getItem('enableBorder')))
  );

  const handleEnableBorderChange = (enableBorder: boolean) => {
    if (enableBorder) {
      window.localStorage.setItem('enableBorder', '1');
      setEnableBorder(true);
    } else {
      window.localStorage.setItem('enableBorder', '0');
      setEnableBorder(false);
    }
  };

  const handleToggleBorder = (e: KeyboardEvent) => {
    if (e.key === 'b' && e.metaKey) {
      console.log('we running bb');
      if (Number(window.localStorage.getItem('enableBorder'))) {
        handleEnableBorderChange(false);
      } else {
        handleEnableBorderChange(true);
      }
    }
  };

  React.useEffect(() => {
    // Keyboard shortcut to enable/disable border
    document.addEventListener('keydown', handleToggleBorder);
    () => document.removeEventListener('keydown', handleToggleBorder);
  }, []);

  return (
    <EmbeddedComponentBorderContext.Provider
      value={{enableBorder, handleEnableBorderChange}}
    >
      {children}
    </EmbeddedComponentBorderContext.Provider>
  );
};
