import React from 'react';
import Box from '@mui/material/Box';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {useTheme} from '@mui/system';
import StripeLogo from '../assets/images/stripe-grey.svg';
import {Footer} from '../components/Footer';

export const CompleteProfileFooter = () => (
  <NoticeFooter center>
    <Typography variant="body2" color="text.secondary">
      The platform can choose to request additional information from the user
      before it collects any payments details. Here, FurEver asks a few
      questions about the user's salon. This information will be stored in the
      platform's database
    </Typography>
  </NoticeFooter>
);

export const OnboardingFooter = () => (
  <NoticeFooter center>
    <Typography variant="body2" color="text.secondary">
      The <code>stripe-connect-account-onboarding</code> component provides a
      seamless onboarding experience for connected accounts to onboard with
      Stripe without having to leave the platform's page.
    </Typography>
  </NoticeFooter>
);

export const LandingNoticeFooter = () => (
  <NoticeFooter center={false}>
    <Link
      href="https://stripe.com"
      target="_blank"
      underline="none"
      display={'flex'}
    >
      <img src={StripeLogo} alt="Stripe logo" title="Stripe logo" />
    </Link>

    <Typography
      sx={{
        fontSize: {sm: 16, xs: 14},
        fontWeight: 600,
        order: {
          xl: 0,
          lg: 1,
        },
      }}
    >
      FurEver is a demo for{' '}
      <Link href="https://stripe.com/connect" target="_blank" underline="none">
        Stripe Connect
      </Link>{' '}
      and{' '}
      <Link
        href="https://stripe.com/docs/connect/get-started-connect-embedded-components"
        target="_blank"
        underline="none"
      >
        Stripe Connect embedded components
      </Link>
      . It is not a real product.
    </Typography>
  </NoticeFooter>
);

const NoticeFooter = ({
  center,
  children,
}: {
  center: boolean;
  children: React.ReactNode;
}) => {
  const theme = useTheme();

  return (
    <Footer>
      <Box
        sx={{
          padding: {
            xs: 0,
            lg: theme.spacing(0, 4),
            xl: 0,
          },
        }}
      >
        <Box
          bgcolor={theme.palette.background.default}
          sx={{
            display: 'flex',
            justifyContent: center ? 'center' : 'space-between',
            alignItems: 'center',
            width: '100%',
            gap: 1.5,
            maxWidth: theme.breakpoints.values.xl,
            marginX: 'auto',
            padding: '10px 22px',
            borderRadius: {lg: 6, xs: 0},
            flexFlow: {
              lg: 'nowrap',
              xs: 'row wrap',
            },
          }}
          boxShadow={12}
        >
          {children}
        </Box>
      </Box>
    </Footer>
  );
};
