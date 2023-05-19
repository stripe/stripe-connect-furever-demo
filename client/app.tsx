import {createTheme, ThemeProvider} from '@mui/material/styles';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ConnectJsWrapper} from './hooks/ConnectJsWrapper';
import {Layout} from './components/Layout';
import {SessionProvider} from './hooks/SessionProvider';
import {
  AuthenticatedAndOnboardedRoute,
  UnauthenticatedRoute,
  OnboardingRoute,
} from './routes/RouteHandlers';
import Landing from './routes/Landing';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Onboarding from './routes/Onboarding';
import Reservations from './routes/Reservations';
import Payments from './routes/Payments';
import Payouts from './routes/Payouts';
import Profile from './routes/Profile';
import NotFound from './routes/NotFound';
import {EmbeddedComponentBorderProvider} from './hooks/EmbeddedComponentBorderProvider';

const theme = createTheme({
  palette: {
    primary: {main: '#228403'},
    secondary: {main: '#002c04'},
    text: {
      primary: '#414552',
      secondary: '#87909f',
    },
    neutral100: {
      main: '#EBEEF1',
    },
  },

  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#414552',
        },
      },
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Ubuntu',
    ].join(','),
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {path: '*', element: <NotFound />},
      {
        path: '/',
        element: <Landing />,
      },
      {
        path: '/login',
        element: (
          <UnauthenticatedRoute>
            <Login />
          </UnauthenticatedRoute>
        ),
      },
      {
        path: '/signup',
        element: (
          <OnboardingRoute>
            <Signup />
          </OnboardingRoute>
        ),
      },
      {
        path: '/reservations',
        element: (
          <AuthenticatedAndOnboardedRoute>
            {() => <Reservations />}
          </AuthenticatedAndOnboardedRoute>
        ),
      },
      {
        path: '/payments',
        element: (
          <AuthenticatedAndOnboardedRoute>
            {() => <Payments />}
          </AuthenticatedAndOnboardedRoute>
        ),
      },
      {
        path: '/payouts',
        element: (
          <AuthenticatedAndOnboardedRoute>
            {() => <Payouts />}
          </AuthenticatedAndOnboardedRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <AuthenticatedAndOnboardedRoute>
            {(user) => <Profile user={user} />}
          </AuthenticatedAndOnboardedRoute>
        ),
      },
      {
        path: '/onboarding',
        element: (
          <AuthenticatedAndOnboardedRoute>
            {() => <Onboarding />}
          </AuthenticatedAndOnboardedRoute>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();

const domNode = document.getElementById('root')!;
const root = ReactDOM.createRoot(domNode);

root.render(
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ConnectJsWrapper>
          <EmbeddedComponentBorderProvider>
            <RouterProvider router={router} />
          </EmbeddedComponentBorderProvider>
        </ConnectJsWrapper>
      </SessionProvider>
    </QueryClientProvider>
  </ThemeProvider>
);
