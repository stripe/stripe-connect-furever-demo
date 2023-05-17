import React from 'react';
import Box from '@mui/material/Box';
import {useEmbeddedComponentBorder} from '../hooks/EmbeddedComponentBorderProvider';

export const EmbeddedComponentContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const enableBorder = useEmbeddedComponentBorder();

  return (
    <Box
      className="w-fill"
      sx={{
        padding: '6px',
        border: '3px dashed',
        borderColor: enableBorder ? 'text.secondary' : 'transparent',
        transition: 'border 0.3s ease-in',
      }}
    >
      {children}
    </Box>
  );
};
