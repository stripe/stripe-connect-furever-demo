import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useSession} from '../hooks/SessionProvider';
import LandingIcon from '../assets/images/st-landing-icon.png';
import LandingBackground from '../assets/images/st-hero.png';
import {LandingNoticeFooter} from '../components/NoticeFooter';
import {RouterLink} from '../components/RouterLink';

const styles = {
  introContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1536,
    padding: '75px 0 75px 2.5em',
    overflowX: 'hidden',
  },
  introText: {
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
  },
  introTextImg: {
    width: 45,
    position: 'absolute',
    left: '-1.75em',
    top: '-1em',
  },
  introImage: {
    borderRadius: '50%',
    width: 530,
    height: 530,
    objectFit: 'cover',
  },
};

export const Landing = () => {
  const {user} = useSession();

  return (
    <>
      <Box sx={styles.introContainer} gap={2}>
        <Box sx={styles.introText}>
          <Box
            component="img"
            src={LandingIcon}
            title="Landing icon"
            alt="Landing icon"
            sx={styles.introTextImg}
          />
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
            Software that keeps you running while you keep the world running.
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
            Our all-in-one solution means you no longer have to sign into multiple platforms. Everything you need to run your business is in one convenient location, wherever you are.
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
        <Box
          sx={{
            width: '50%',
          }}
        >
          <Box
            component="img"
            src={LandingBackground}
            title="Landing image"
            alt="Landing image"
            sx={styles.introImage}
          />
        </Box>
      </Box>
      <LandingNoticeFooter />
    </>
  );
};
