import React from 'react';
import Typography from '@mui/material/Typography';
import CreateUser from '../components/CreateUser';
import CompleteProfile from '../components/CompleteProfile';
import {useSession} from '../hooks/SessionProvider';
import {Container} from '../components/Container';

const Signup = () => {
  const {user, stripeAccount} = useSession();

  const renderTitle = () => {
    if (!user) {
      return 'Create your account';
    } else if (!stripeAccount) {
      return 'Complete your profile';
    }
  };

  const renderComponent = () => {
    if (!user) {
      return <CreateUser />;
    } else if (!stripeAccount) {
      return <CompleteProfile />;
    }
  };

  return (
    <Container
      sx={{
        alignItems: 'center',
        gap: 4,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
        }}
      >
        {renderTitle()}
      </Typography>
      {renderComponent()}
    </Container>
  );
};

export default Signup;
