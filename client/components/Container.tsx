import React from 'react';
import Box, {BoxProps} from '@mui/material/Box';
import {useTheme} from '@mui/system';

export const Container = ({children, sx, ...rest}: BoxProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        ...sx,
      }}
      bgcolor={theme.palette.background.default}
      {...rest}
    >
      {children}
    </Box>
  );
};
