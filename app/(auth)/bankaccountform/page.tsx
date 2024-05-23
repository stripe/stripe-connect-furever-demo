import {getServerSession} from 'next-auth';
import {redirect} from 'next/navigation';
import BankAccountForm from './form';

export default async function BankAccount() {
  const session = await getServerSession();
  if (!session || !session.user?.email) {
    return redirect('/login');
  }
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">Add your bank account </h2>
      </div>
      <div className="flex flex-col gap-y-[16px]">
        <p className="text-sm text-secondary">
          Note: you need to use a Stripe test bank account. Those can be found{' '}
          <a href="https://docs.stripe.com/connect/testing#payouts">here</a>
        </p>
        <BankAccountForm />
      </div>
    </>
  );
}
