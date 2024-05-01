import Link from 'next/link';
import {getServerSession} from 'next-auth';
import {redirect} from 'next/navigation';

export default async function Quickstart() {
  const session = await getServerSession();

  if (session) {
    return redirect('/');
  }

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold pb-2">Log in</h2>
      </div>
      <div className="text-secondary"> 
      Creating your account
      </div>
    </>
  );
}
