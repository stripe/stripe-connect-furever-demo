import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useSession} from '../hooks/SessionProvider';

export const UnauthenticatedRoute = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const {search} = useLocation();
  const {user, stripeAccount} = useSession();
  if (!user) {
    return <>{children}</>;
  }

  // If no Stripe account, user needs to complete their profile
  if (!stripeAccount) {
    return <Navigate to={`/signup${search}`} replace />;
  }

  // If not fully onboarded, redirect to onboarding page
  if (!stripeAccount.details_submitted) {
    return <Navigate to={`/onboarding${search}`} replace />;
  }

  // If the user is fully onboarded, redirect to the reservations page
  return <Navigate to={`/reservations${search}`} replace />;
};

export const OnboardingRoute = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const {search} = useLocation();
  const {user, stripeAccount} = useSession();
  if (!user || !stripeAccount) {
    return <>{children}</>;
  }

  // If not fully onboarded, redirect to onboarding page
  if (!stripeAccount.details_submitted) {
    return <Navigate to={`/onboarding${search}`} replace />;
  }

  // If the user is fully onboarded, redirect to the reservations page
  return <Navigate to={`/reservations${search}`} replace />;
};

export const AuthenticatedAndOnboardedRoute = ({
  children,
}: {
  children: (user: Express.User) => JSX.Element;
}): JSX.Element => {
  const {search} = useLocation();
  const {user, stripeAccount} = useSession();
  if (!user) {
    return <Navigate to={`/login${search}`} replace />;
  }
  if (!stripeAccount) {
    return <Navigate to={`/signup${search}`} replace />;
  }
  return <>{children(user)}</>;
};

export const CustomGatedRoute = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const {search} = useLocation();
  const {stripeAccount} = useSession();
  /*if (stripeAccount?.type !== 'custom') {
    return <Navigate to={`/reservations${search}`} replace />;
  }*/
  return <>{children}</>;
};
