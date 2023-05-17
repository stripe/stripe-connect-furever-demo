import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CreateUser from '../components/CreateUser';
import CompleteProfile from '../components/CompleteProfile';
import {useSession} from '../hooks/SessionProvider';

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
    <Box className="container w-fill" gap={4}>
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
        }}
      >
        {renderTitle()}
      </Typography>
      {renderComponent()}
    </Box>
  );
};

export default Signup;
