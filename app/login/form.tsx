'use client';

import React, {useState} from 'react';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';

type FormValues = {
  email: string;
  password: string;
};

export default function Form() {
  const router = useRouter();

  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signIn('login', {
        email: formValues.email,
        password: formValues.password,
        redirect: true,
      });
    } catch (error: any) {
      console.error('An error occurred when signing in', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col space-y-2">
        <label className="font-bold" htmlFor="email">
          Email
        </label>
        <input
          className="border border-gray-300 rounded-md p-2"
          type="email"
          name="email"
          id="email"
          placeholder="jenny.rosen@example.com"
          required
          value={formValues.email}
          onChange={(event) =>
            setFormValues((prev) => ({
              ...prev,
              email: event.target.value,
            }))
          }
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-bold" htmlFor="password">
          Password
        </label>
        <input
          className="border border-gray-300 rounded-md p-2"
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          required
          value={formValues.password}
          onChange={(event) =>
            setFormValues((prev) => ({
              ...prev,
              password: event.target.value,
            }))
          }
        />
      </div>
      <div>
        <input
          className="bg-primary text-white p-2 rounded-md w-full font-bold"
          type="submit"
          value="Continue"
        />
      </div>
    </form>
  );
}
