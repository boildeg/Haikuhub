"use client";

import { registerUser } from "@/actions/userControler";
import { useActionState } from "react";
import Link from "next/link";
export default function RegisterForm() {
  const [formState, formAction] = useActionState(registerUser, {});

  let errors = {};

  return (
    <form action={formAction} className="mx-auto max-w-sm p-4">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full "
          autoComplete="off"
          name="username"
        />
        {formState?.errors?.username && (
          <div role="alert" className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{formState?.errors?.username}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mt-2"
          autoComplete="off"
          name="password"
        />
        {formState?.errors?.password && (
          <div role="alert" className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{formState?.errors?.password}</span>
          </div>
        )}
      </div>
      <button className="btn btn-primary mt-2 w-full">Create account</button>
      <Link href="/login">Already have an account? Log in!</Link>
    </form>
  );
}
