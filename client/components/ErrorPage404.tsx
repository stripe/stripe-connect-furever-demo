import React from 'react';
import {Link as RouterLink, useLocation} from 'react-router-dom';
import {useMutation} from 'react-query';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import {useTheme} from '@mui/material/styles';
import logo from '../assets/images/favicon.png';
import {useSession} from '../hooks/SessionProvider';
import {useDisplayShortName} from '../hooks/useDisplayName';
import {OnboardingNotice} from './OnboardingNotice';

export const ErrorPage404 = () => {
  return (
    <Box className="container w-fill" gap={4}>
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
        }}
      >
        Page not found
      </Typography>
      <Box
        className="container w-fill"
        sx={{
          gap: 2,
          width: {
            xs: '100%',
            sm: '75%',
            lg: '50%',
          },
        }}
      >
        <Typography>🐾</Typography>
      </Box>
    </Box>
  );
};
