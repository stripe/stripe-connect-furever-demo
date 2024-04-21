import React from 'react';
import {useLocation} from 'react-router-dom';
import {useMutation} from 'react-query';
import Stripe from 'stripe';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import {useTheme} from '@mui/material/styles';
import logo from '../assets/images/logo.png';
import {useSession} from '../hooks/SessionProvider';
import {useDisplayShortName} from '../hooks/useDisplayName';
import {OnboardingNotice} from './OnboardingNotice';
import {RouterLink} from './RouterLink';
import {useConnectJSContext} from '../hooks/ConnectJSProvider';
import {stripe} from '../../server/routes/stripeSdk';

const useLogout = () => {
  const {search} = useLocation();
  const connectJSContext = useConnectJSContext();

  return useMutation<void, Error>('logout', async () => {
    await connectJSContext.connectInstance?.logout();
    const response = await fetch('/api/logout', {
      method: 'POST',
    });
    if (response.ok) {
      window.location.replace(`/${search}`);
    }
  });
};

type Page = {
  name: string;
  href: string;
  shouldDisplayFilter?: (stripeAccount: Stripe.Account) => boolean;
};

const authenticatedRoutes: Page[] = [
  {name: 'Reservations', href: '/reservations'},
  {name: 'Payments', href: '/payments'},
  {name: 'Payouts', href: '/payouts'},
  {
    name: 'Finance',
    href: '/finance',
    shouldDisplayFilter: (stripeAccount) =>
      stripeAccount.controller?.dashboard?.type === 'none' &&
      stripeAccount.controller?.application?.loss_liable === true &&
      stripeAccount.controller?.application?.onboarding_owner === true,
  },
];
const unauthenticatedRoutes: Page[] = [
  {name: 'Sign up', href: '/signup'},
  {name: 'Login', href: '/login'},
];
const settings: Page[] = [
  {name: 'Profile', href: '/profile'},
  {name: 'Payment Methods', href: '/payment-methods'},
  {name: 'Settings', href: '/settings'},
];

export const NavBar = () => {
  const {mutate: logout} = useLogout();
  const {user, stripeAccount} = useSession();
  const displayName = useDisplayShortName();
  const theme = useTheme();
  const {pathname} = useLocation();

  const routes = user ? authenticatedRoutes : unauthenticatedRoutes;

  const [anchorElMenu, setAnchorElMenu] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElMenu(null);
  };

  const renderNavLinks = () => {
    if (user && !stripeAccount) {
      return null;
    }

    return (
      <Box
        sx={{
          flexGrow: 1,
          gap: 3,
          display: {
            xs: 'none',
            sm: 'flex',
          },
          justifyContent: user ? 'flex-start' : 'flex-end',
        }}
      >
        {routes
          // For paths that only support certain controller shapes, filter out the ones that don't match.
          .filter(({shouldDisplayFilter}) => {
            // Not all pages require a filter.
            if (!shouldDisplayFilter || !stripeAccount) {
              return true;
            }

            return shouldDisplayFilter(stripeAccount);
          })
          .map(({name, href}) => (
            <Link component={RouterLink} key={name} to={href} underline="none">
              <Typography
                textAlign="center"
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                  '&:hover': {
                    color: theme.palette.primary.main,
                  },
                  textDecoration: 'none',
                }}
                color={pathname === href ? 'primary' : 'secondary'}
              >
                {name}
              </Typography>
            </Link>
          ))}
      </Box>
    );
  };

  const renderMenuIcon = () => {
    const theme = useTheme();
    if (user) {
      return (
        <Avatar
          sx={{
            color: 'white',
            backgroundColor: theme.palette.primary.main,
          }}
        >
          {displayName}
        </Avatar>
      );
    }

    if (anchorElMenu) {
      return <MenuOpenIcon />;
    } else {
      return <MenuIcon />;
    }
  };

  const renderNavMenu = () => {
    return (
      <Box
        sx={{
          flexGrow: 0,
          display: {
            xs: 'flex',
            sm: user ? 'flex' : 'none',
          },
        }}
      >
        <IconButton onClick={handleOpenNavMenu} sx={{p: 0}}>
          {renderMenuIcon()}
        </IconButton>
        <Menu
          sx={{mt: '45px'}}
          id="menu-appbar"
          anchorEl={anchorElMenu}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElMenu)}
          onClose={handleCloseNavMenu}
        >
          {user &&
            stripeAccount &&
            settings.map(({name, href}) => (
              <Link component={RouterLink} to={href} underline="none">
                <MenuItem key={name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" variant="body2">
                    {name}
                  </Typography>
                </MenuItem>
              </Link>
            ))}
          {routes.map(({name, href}) => (
            <Link component={RouterLink} to={href} underline="none">
              <MenuItem
                key={name}
                onClick={handleCloseNavMenu}
                sx={{
                  display: {
                    xs: 'flex',
                    sm: 'none',
                  },
                }}
              >
                <Typography textAlign="center" variant="body2">
                  {name}
                </Typography>
              </MenuItem>
            </Link>
          ))}
          {user && (
            <Link underline="none" onClick={() => logout()}>
              <MenuItem>
                <Typography textAlign="center" variant="body2">
                  Log out
                </Typography>
              </MenuItem>
            </Link>
          )}
        </Menu>
      </Box>
    );
  };

  return (
    <>
      <OnboardingNotice />
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.palette.background.default,
          backgroundImage: 'none',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            width: '100%',
            height: '64px',
            fontSize: 16,
            maxWidth: theme.breakpoints.values.xl,
            padding: {
              xs: theme.spacing(0, 2),
              sm: theme.spacing(0, 4),
              xl: 0,
            },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              gap: 4,
            }}
          >
            <Box
              sx={{
                height: '40px',
              }}
            >
              <Link component={RouterLink} to="/" underline="none">
                <img
                  src={logo}
                  title="FurEver logo"
                  alt="FurEver"
                  style={{height: '40px'}}
                />
              </Link>
            </Box>
            {renderNavLinks()}
          </Box>
          {renderNavMenu()}
        </Toolbar>
      </AppBar>
    </>
  );
};
