import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useSession} from '../hooks/SessionProvider';
import LandingIcon from '../assets/images/landing-icon.png';
import LandingBackground from '../assets/images/landing.jpeg';
import {LandingNoticeFooter} from '../components/NoticeFooter';
import RouterLink from '../components/RouterLink';

const Landing = () => {
  const {user} = useSession();

  return (
    <>
      <Box className="intro-container" gap={2}>
        <Box className="intro-text">
          <img src={LandingIcon} title="Landing icon" alt="Landing icon" />
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: {
                lg: 55,
                xs: 40,
              },
            }}
            variant="h4"
          >
            Manage your business with ease.
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              marginTop: 2,
              marginBottom: 4,
              fontSize: {
                lg: 30,
                xs: 20,
              },
            }}
          >
            FurEver is the world's leading pet grooming platform: join our team
            of salons and expand your business.
          </Typography>
          <Button
            to={user ? '/reservations' : '/signup'}
            variant="contained"
            component={RouterLink}
            sx={{
              paddingY: 1,
              paddingX: 3,
              fontWeight: 700,
            }}
          >
            {user ? 'View dashboard' : 'Start today'}
          </Button>
        </Box>
        <Box className="intro-image">
          <img
            src={LandingBackground}
            title="Landing image"
            alt="Landing image"
          />
        </Box>
      </Box>
      <LandingNoticeFooter />
    </>
  );
};

export default Landing;
