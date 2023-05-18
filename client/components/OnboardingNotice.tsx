import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Box from '@mui/material/Box';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {useSession} from '../hooks/SessionProvider';

export const OnboardingNotice = () => {
  const {stripeAccount} = useSession();

  if (!stripeAccount || stripeAccount.details_submitted) {
    return null;
  }

  return (
    <Box
      bgcolor="primary.main"
      className="w-fill"
      display="flex"
      justifyContent="center"
      paddingY={1}
    >
      <Typography color="white">
        You need to complete onboarding.{' '}
        <Link component={RouterLink} to="/onboard">
          <Typography
            component="span"
            color="white"
            display="inline-flex"
            fontWeight={600}
          >
            Complete now <ChevronRightIcon />
          </Typography>
        </Link>
      </Typography>
    </Box>
  );
};
