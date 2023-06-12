import React from 'react';
import {Navigate} from 'react-router-dom';
import {useSession} from '../hooks/SessionProvider';
import {useAccount} from '../hooks/AccountProvider';

export const UnauthenticatedRoute = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const {user, stripeAccount} = useSession();
  if (!user) {
    return <>{children}</>;
  }

  // If no Stripe account, user needs to complete their profile
  if (!stripeAccount) {
    return <Navigate to="/signup" replace />;
  }

  // If not fully onboarded, redirect to onboarding page
  if (!stripeAccount.details_submitted) {
    return <Navigate to="/onboarding" replace />;
  }

  // If the user is fully onboarded, redirect to the reservations page
  return <Navigate to="/reservations" replace />;
};

export const OnboardingRoute = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const {user, stripeAccount} = useSession();
  if (!user || !stripeAccount) {
    return <>{children}</>;
  }

  // If not fully onboarded, redirect to onboarding page
  if (!stripeAccount.details_submitted) {
    return <Navigate to="/onboarding" replace />;
  }

  // If the user is fully onboarded, redirect to the reservations page
  return <Navigate to="/reservations" replace />;
};

export const AuthenticatedAndOnboardedRoute = ({
  children,
}: {
  children: (user: Express.User) => JSX.Element;
}): JSX.Element => {
  const {user, stripeAccount} = useSession();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!stripeAccount) {
    return <Navigate to="/signup" replace />;
  }
  return <>{children(user)}</>;
};

export const CustomGatedRoute = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const {accountConfiguration} = useAccount();
  if (accountConfiguration !== 'no_dashboard_poll') {
    return <Navigate to="/reservations" replace />;
  }
  return <>{children}</>;
};
