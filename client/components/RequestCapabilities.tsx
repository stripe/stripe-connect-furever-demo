import React from 'react';
import {useMutation} from 'react-query';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Container} from '../components/Container';

const useRequestCapabilities = (capabilities: string[]) => {
  return useMutation<void, Error>('requestCapabilities', async () => {
    const response = await fetch('/request-capabilities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        capabilities: capabilities,
      }),
    });
    if (!response.ok) {
      const json = await response.json();
      throw new Error(json?.error ?? 'An error ocurred, please try again.');
    }
  });
};

type RequestCapabilitiesProps = {
  capabilities: any;
  title: string;
  description: string;
  onSuccess: () => void;
};

export const RequestCapabilities = ({
  title,
  description,
  capabilities,
  onSuccess,
}: RequestCapabilitiesProps) => {
  const {mutate} = useRequestCapabilities(capabilities);

  return (
    <Container sx={{alignItems: 'center', gap: 4, marginBottom: 2}}>
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
        }}
      >
        {description}
      </Typography>
      <Button
        type="submit"
        variant="contained"
        sx={{
          fontWeight: 700,
        }}
        onClick={async () => {
          await mutate();
          onSuccess();
        }}
      >
        Enable
      </Button>
    </Container>
  );
};
