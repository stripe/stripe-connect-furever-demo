import {getServerSession} from 'next-auth';
import Schedule from '@/app/components/Schedule';
import BalanceWidget from '@/app/components/BalanceWidget';
import RecentPaymentsWidget from '@/app/components/RecentPaymentsWidget';
import MonthToDateWidget from '@/app/components/MonthToDateWidget';
import CustomersWidget from '@/app/components/CustomersWidget';
import BackgroundImage from '@/public/pattern-green.png';
import Dog from '@/public/landing-page.jpeg';
import FureverLogo from '@/public/furever_logo.png';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {ArrowRight, CalendarCheck} from 'lucide-react';
import LandingPage from '@/app/LandingPage';

export default async function Dashboard() {
  const session = await getServerSession();

  if (session) {
    return (
      <>
        <h1 className="text-3xl font-bold">Welcome, Jenny!</h1>
        <div className="flex flex-row items-start space-x-5">
          <div className="min-w-[700px] flex-1">
            <Schedule />
          </div>
          <div className="w-[30%] min-w-[300px] space-y-4">
            <BalanceWidget />
            <RecentPaymentsWidget />
            <h2 className="pt-4 text-lg font-bold">Performance</h2>
            <MonthToDateWidget />
            <CustomersWidget />
          </div>
        </div>
      </>
    );
  } else {
    return <LandingPage />;
  }
}
