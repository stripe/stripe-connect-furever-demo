import React from 'react';
import * as ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ConnectJsWrapper} from './hooks/ConnectJsWrapper';
import {Layout} from './components/Layout';
import {SessionProvider} from './hooks/SessionProvider';
import {EmbeddedComponentBorderProvider} from './hooks/EmbeddedComponentBorderProvider';
import {ColorModeProvider} from './hooks/ColorModeProvider';
import {ThemeProvider} from './hooks/ThemeProvider';
import {
  AuthenticatedAndOnboardedRoute,
  UnauthenticatedRoute,
  OnboardingRoute,
  CustomGatedRoute,
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
import Settings from './routes/Settings';
import BankAccountForm from './routes/BankAccountForm';
import {AccountProvider} from './hooks/AccountProvider';

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
        path: '/settings',
        element: <Settings />,
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
      {
        path: '/bankaccountform',
        element: (
          <CustomGatedRoute>
            <BankAccountForm />
          </CustomGatedRoute>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();

const domNode = document.getElementById('root')!;
const root = ReactDOM.createRoot(domNode);

root.render(
  <AccountProvider>
    <ColorModeProvider>
      <ThemeProvider>
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
    </ColorModeProvider>
  </AccountProvider>
);
