import React from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Grid';
import {useSession} from '../hooks/SessionProvider';
import {useDisplayName} from '../hooks/useDisplayName';

const ProfilePhoto = () => {
  const {user} = useSession();
  const displayName = useDisplayName();

  if (!user) {
    return null;
  }
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
          {`Salon since ${moment(user.created).format('DD MMM YYYY')}`}
        </Typography>
        <Typography variant="h6">{displayName}</Typography>
      </Box>
    </Box>
  );
};

const ProfileGrid = () => {
  const {user} = useSession();
  const items = [
    {key: 'Email', value: user?.email || '--'},
    {key: 'Name', value: user ? user.firstName + ' ' + user.lastName : '--'},
    {key: 'Stripe account', value: user?.stripeAccountId || '--'},
    {key: 'Business name', value: user?.salon.name || '--'},
    {key: 'License', value: user?.salon.license || '--'},
    {
      key: 'Specialty',
      value: user
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

export const ProfileInformation = () => {
  return (
    <Box
      className="w-fill"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
      gap={4}
    >
      <ProfilePhoto />
      <ProfileGrid />
    </Box>
  );
};
