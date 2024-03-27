'use client';

import AuthenticatedAndOnboardedRoute from '../../components/AuthenticatedAndOnboardedRoute';

export default function Classes() {
  return (
    <AuthenticatedAndOnboardedRoute>
      <h1 className="text-3xl font-bold">Classes</h1>
    </AuthenticatedAndOnboardedRoute>
  );
}
