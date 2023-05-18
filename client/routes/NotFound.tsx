import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RouterLink from '../components/RouterLink';

const NotFound = () => {
  return (
    <Box className="container w-fill" gap={2}>
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
        }}
      >
        404
      </Typography>
      <Box
        className="container w-fill"
        sx={{
          gap: 1,
          width: {
            xs: '100%',
            sm: '75%',
            lg: '50%',
          },
        }}
      >
        <Typography>The page you're looking for doesn't exist.</Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          sx={{
            fontWeight: 600,
          }}
        >
          Go home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
