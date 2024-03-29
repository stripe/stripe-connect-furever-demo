'use client';

import AuthenticatedAndOnboardedRoute from '@/app/components/AuthenticatedAndOnboardedRoute';

export default function Instructors() {
  return (
    <AuthenticatedAndOnboardedRoute>
      <h1 className="text-3xl font-bold">Instructors</h1>
    </AuthenticatedAndOnboardedRoute>
  );
}
