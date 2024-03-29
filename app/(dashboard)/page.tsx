import Schedule from '@/app/components/Schedule';
import Widget from '@/app/components/Widget';

export default function Dashboard() {
  return (
    <>
      <h1 className="text-3xl font-bold">Welcome, Eric!</h1>
      <div className="flex flex-row space-x-5 items-start">
        <div className="flex-1 min-w-[700px]">
          <Schedule />
        </div>
        <div className="w-1/4 space-y-4">
          <Widget />
          <Widget />
          <Widget />
        </div>
      </div>
    </>
  );
}
