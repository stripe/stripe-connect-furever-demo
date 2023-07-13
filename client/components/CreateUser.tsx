import React from 'react';
import {useMutation} from 'react-query';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import {FormBlock, TextInput} from './FormInputs';
import {Container} from './Container';

type FormValues = {
  email: string;
  password: string;
};

const useCreateUser = () => {
  const navigate = useNavigate();
  return useMutation<void, Error, FormValues>(
    'createAccount',
    async (formValues: FormValues) => {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        return navigate(0);
      }
      const {error} = await response.json();
      throw new Error(error);
    }
  );
};

export const CreateUser = () => {
  const [formValues, setFormValues] = React.useState<FormValues>({
    email: '',
    password: '',
  });
  const {mutate, isLoading, error} = useCreateUser();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(formValues);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      autoComplete="off"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        width: {
          xs: '100%',
          sm: '75%',
          lg: '50%',
        },
      }}
    >
      <FormBlock>
        <TextInput
          label="Email"
          type="email"
          name="email"
          id="email"
          placeholder="you@example.com"
          required
          value={formValues.email}
          onChange={(event) =>
            setFormValues((prev) => ({...prev, email: event.target.value}))
          }
        />
        <Divider />
        <TextInput
          label="Password"
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          required
          value={formValues.password}
          onChange={(event) =>
            setFormValues((prev) => ({...prev, password: event.target.value}))
          }
        />
      </FormBlock>
      <Container
        sx={{
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{mt: 3, mb: 2, fontWeight: 700}}
          disabled={isLoading}
        >
          Sign up
        </Button>
        {error?.message && (
          <Typography variant="body2" color="error">
            {error.message}
          </Typography>
        )}
      </Container>
    </Box>
  );
};
