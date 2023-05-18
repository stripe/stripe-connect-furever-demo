import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type Props = {
  errorMessage?: string;
  handleTryAgain: () => void;
};

export const ErrorState = ({errorMessage, handleTryAgain}: Props) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        minHeight: '100vh',
        left: 0,
        bottom: 0,
        top: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      gap={2}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
        }}
      >
        An error has occurred
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          width: {
            xs: '100%',
            sm: '75%',
            lg: '50%',
          },
        }}
      >
        <Typography>
          {errorMessage ?? 'Something went wrong, please try again.'}
        </Typography>
        <Button
          onClick={() => handleTryAgain()}
          variant="contained"
          sx={{
            fontWeight: 600,
          }}
        >
          Try again
        </Button>
      </Box>
    </Box>
  );
};
