import {getServerSession} from 'next-auth';

import {redirect} from 'next/navigation';

import Form from './form';

export default async function Signup() {
  const session = await getServerSession();

  if (session) {
    redirect('/home');
  }

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold pb-2">Get started</h2>
      </div>
      <div className='flex flex-col gap-y-[16px]'>
      <Form />
      </div>
    </>
  );
}
