import Schedule from '@/app/components/Schedule';
import BalanceWidget from '@/app/components/BalanceWidget';
import RecentPaymentsWidget from '@/app/components/RecentPaymentsWidget';
import MonthToDateWidget from '@/app/components/MonthToDateWidget';
import CustomersWidget from '@/app/components/CustomersWidget';

export default function Dashboard() {
  return (
    <>
      <h1 className="text-3xl font-bold">Welcome, Eric!</h1>
      <div className="flex flex-row space-x-5 items-start">
        <div className="flex-1 min-w-[700px]">
          <Schedule />
        </div>
        <div className="w-1/4 space-y-4">
          <BalanceWidget />
          <RecentPaymentsWidget />
          <h2 className="text-lg font-bold">Performance</h2>
          <MonthToDateWidget chartWidth={125} />
          <CustomersWidget chartWidth={125} />
        </div>
      </div>
    </>
  );
}
