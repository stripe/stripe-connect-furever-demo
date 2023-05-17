import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const FullScreenLoading = () => (
  <Box
    sx={{
      position: 'absolute',
      minHeight: '100vh',
      left: 0,
      bottom: 0,
      top: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <CircularProgress />
  </Box>
);
