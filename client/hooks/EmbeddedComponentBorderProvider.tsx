import React, {createContext, useContext, useState} from 'react';

const EmbeddedComponentBorderContext = createContext<boolean>(false);

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

  const handleToggleBorder = (e: KeyboardEvent) => {
    if (e.key === 'b' && e.metaKey) {
      if (Number(window.localStorage.getItem('enableBorder'))) {
        window.localStorage.setItem('enableBorder', '0');
        setEnableBorder(false);
      } else {
        window.localStorage.setItem('enableBorder', '1');
        setEnableBorder(true);
      }
    }
  };

  React.useEffect(() => {
    // Keyboard shortcut to enable/disable border
    document.addEventListener('keydown', handleToggleBorder);
    () => document.removeEventListener('keydown', handleToggleBorder);
  }, []);

  return (
    <EmbeddedComponentBorderContext.Provider value={enableBorder}>
      {children}
    </EmbeddedComponentBorderContext.Provider>
  );
};
