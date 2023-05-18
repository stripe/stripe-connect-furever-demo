import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useEmbeddedComponentBorder} from '../hooks/EmbeddedComponentBorderProvider';

export const EmbeddedContainer = ({children}: {children: React.ReactNode}) => (
  <Typography
    component={'div'}
    className="embedded-container"
    gap={2}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    }}
  >
    {children}
  </Typography>
);

export const EmbeddedComponentContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const enableBorder = useEmbeddedComponentBorder();

  return (
    <Box
      width="100%"
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
