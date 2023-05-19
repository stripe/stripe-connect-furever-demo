import React from 'react';
import Box, {BoxProps} from '@mui/material/Box';
import {SxProps, Theme} from '@mui/system';

export const Container = ({children, sx, ...rest}: BoxProps) => (
  <Box
    sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      ...sx,
    }}
    {...rest}
  >
    {children}
  </Box>
);
