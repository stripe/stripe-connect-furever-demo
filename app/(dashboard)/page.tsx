import Schedule from '@/app/components/Schedule';
import BalanceWidget from '@/app/components/BalanceWidget';
import RecentPaymentsWidget from '@/app/components/RecentPaymentsWidget';
import MonthToDateWidget from '@/app/components/MonthToDateWidget';
import CustomersWidget from '@/app/components/CustomersWidget';

export default function Dashboard() {
  return (
    <>
      <h1 className="text-3xl font-bold">Welcome, Eric!</h1>
      <div className="flex flex-row items-start space-x-5">
        <div className="min-w-[700px] flex-1">
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
