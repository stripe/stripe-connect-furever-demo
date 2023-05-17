import React from 'react';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PetsIcon from '@mui/icons-material/Pets';
import Typography from '@mui/material/Typography';

const NotFound = () => {
  const navigate = useNavigate();

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
        <PetsIcon color="primary" sx={{fontSize: 60}} />
        <Button
          onClick={() => navigate(-1)}
          variant="contained"
          sx={{
            fontWeight: 600,
          }}
        >
          Go back
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
