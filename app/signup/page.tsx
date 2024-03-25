import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Form from "./form";

export default async function Signup() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center min-h-screen space-x-20">
      <div className="max-w-sm  space-y-4">
        <h1 className="text-4xl font-bold">
          Manage your fitness studio with ease
        </h1>
        <p>Pose is the world&apos;s leading health and wellness platform.</p>
      </div>
      <div className="bg-white p-4 space-y-4 rounded-xl min-w-96">
        <h2 className="text-2xl font-bold">Register</h2>
        <div>
          Already have an account? <Link href="/login">Login</Link>
        </div>
        <Form />
      </div>
    </div>
  );
}
