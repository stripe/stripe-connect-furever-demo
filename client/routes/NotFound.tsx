import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RouterLink from '../components/RouterLink';
import {Container} from '../components/Container';

const NotFound = () => {
  return (
    <Container
      sx={{
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
        }}
      >
        404
      </Typography>
      <Container
        sx={{
          alignItems: 'center',
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
      </Container>
    </Container>
  );
};

export default NotFound;
