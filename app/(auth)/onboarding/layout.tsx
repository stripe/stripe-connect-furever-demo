import AuthenticatedRoute from '@/app/components/AuthenticatedRoute';
import OnboardingWithTools from './OnboardingWithTools';

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthenticatedRoute>
      <OnboardingWithTools>{children}</OnboardingWithTools>
    </AuthenticatedRoute>
  );
}
