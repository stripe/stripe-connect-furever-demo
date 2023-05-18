import React from 'react';
import {useMutation} from 'react-query';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import {FormBlock, TextInput} from '../components/FormInputs';
import {Container} from '../components/Container';

const useLogin = () => {
  const navigate = useNavigate();
  return useMutation<void, Error, FormData>(
    'login',
    async (formData: FormData) => {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
        }),
      });

      if (response.ok) {
        return navigate(0);
      } else {
        throw new Error('Unrecognized email or password, please try again.');
      }
    }
  );
};

const Login = () => {
  const {mutate, isLoading, error} = useLogin();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    mutate(formData);
  }

  return (
    <Container
      gap={4}
      sx={{
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
        }}
      >
        Log in to your account
      </Typography>
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
          />
          <Divider />
          <TextInput
            label="Password"
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            required
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
            Login
          </Button>
          {error?.message && (
            <Typography variant="body2" color="error">
              {error.message}
            </Typography>
          )}
        </Container>
      </Box>
    </Container>
  );
};

export default Login;
