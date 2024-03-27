'use client';

import AuthenticatedRoute from './components/AuthenticatedRoute';
import Schedule from './components/Schedule';
import Widget from './components/Widget';

export default function Dashboard() {
  return (
    <AuthenticatedRoute>
      <h1 className="text-3xl font-bold">Welcome, Eric!</h1>
      <div className="flex flex-row space-x-8 items-start">
        <div className="flex-1 min-w-[700px]">
          <Schedule />
        </div>
        <div className="w-1/4 space-y-8">
          <Widget />
          <Widget />
          <Widget />
        </div>
      </div>
    </AuthenticatedRoute>
  );
}
