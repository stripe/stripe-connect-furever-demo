import React from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material/styles';
import {NavBar} from './NavBar';

export const Layout = () => {
  const {pathname} = useLocation();
  const theme = useTheme();

  return (
    <>
      <NavBar />
      <Box
        sx={{
          width: '100%',
          maxWidth: theme.breakpoints.values.xl,
          ...(pathname === '/'
            ? {}
            : {
                marginTop: theme.spacing(6),
                padding: {
                  xs: theme.spacing(0, 2),
                  sm: theme.spacing(0, 4),
                  xl: 0,
                },
              }),
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};
