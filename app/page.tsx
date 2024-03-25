'use client';

import AuthenticatedRoute from './components/AuthenticatedRoute';

export default function Dashboard() {
  return (
    <AuthenticatedRoute>
      <h1 className="text-3xl font-bold">Home</h1>
    </AuthenticatedRoute>
  );
}
