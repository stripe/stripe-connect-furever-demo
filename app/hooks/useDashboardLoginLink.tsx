import {useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';

export const useDashboardLoginLink = () => {
  const {data: session} = useSession();

  const dashboardType =
    session?.user?.stripeAccount?.controller?.stripe_dashboard?.type;

  const hasDashboardAccess =
    dashboardType === 'express' || dashboardType === 'full';

  const [dashboardLoginLink, setDashboardLoginLink] = useState<string>();

  useEffect(() => {
    const fetchLink = async () => {
      const res = await fetch('/api/login_link');
      const data = await res.json();
      setDashboardLoginLink(data.url);
    };

    fetchLink();
  }, []);

  return {hasDashboardAccess, dashboardLoginLink};
};
