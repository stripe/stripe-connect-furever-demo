import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Grid';
import {useSession} from '../hooks/SessionProvider';
import {useDisplayName} from '../hooks/useDisplayName';

const ProfilePhoto = ({user}: {user: Express.User}) => {
  const displayName = useDisplayName();

  return (
    <Box
      sx={{
        display: 'flex',
      }}
      gap={3}
    >
      <AccountCircleIcon sx={{fontSize: 50}} />
      <Box>
        <Typography variant="body2" fontSize={14}>
          {`Salon since ${new Date(user.created).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}`}
        </Typography>
        <Typography variant="h6">{displayName}</Typography>
      </Box>
    </Box>
  );
};

const ProfileGrid = ({user}: {user: Express.User}) => {
  const items = [
    {key: 'Email', value: user.email || '--'},
    {
      key: 'Name',
      value: user.firstName ? user.firstName + ' ' + user.lastName : '--',
    },
    {key: 'Stripe account', value: user.stripeAccountId || '--'},
    {key: 'Business name', value: user.salon.name || '--'},
    {key: 'License', value: user.salon.license || '--'},
    {
      key: 'Specialty',
      value: user.salon.specialty
        ? user.salon.specialty.charAt(0).toUpperCase() +
          user.salon.specialty.slice(1)
        : '--',
    },
  ];

  return (
    <Grid container columnSpacing={6} rowSpacing={2} width="fit-content">
      {items.map(({key, value}) => (
        <Grid
          item
          key={key}
          xs={12}
          sm={6}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography color="text.secondary" fontSize={14}>
            {key}
          </Typography>
          <Typography fontSize={14}>{value}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export const ProfileInformation = ({user}: {user: Express.User}) => {
  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
      gap={4}
    >
      <ProfilePhoto user={user} />
      <ProfileGrid user={user} />
    </Box>
  );
};
