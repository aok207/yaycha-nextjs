"use client";

import PasswordInput from "@/components/shared/password-input";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFormState } from "react-dom";
import { login } from "@/app/login/actions";
import SubmitButton from "@/components/shared/submit-button";

const LogInForm = () => {
  const [state, action] = useFormState(login, null);

  return (
    <form
      action={action}
      className="flex flex-col gap-4 w-full sm:w-1/3 mx-auto mt-14"
    >
      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="email">
          Email
        </label>
        <Input
          name="email"
          id="email"
          aria-label="Please enter your email."
          required
          aria-required
          autoComplete="off"
        />
        {state?.errors?.email && (
          <p className="text-sm text-red-600">{state.errors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="password">
          Password
        </label>
        <PasswordInput
          name="password"
          id="password"
          aria-label="Please enter your password."
          aria-required
          autoComplete="off"
        />
        {state?.errors?.password && (
          <p className="text-sm text-red-600">{state.errors.password}</p>
        )}
      </div>

      <SubmitButton text="Log In" className="mt-4" />

      <p className="text-center text-gray-600">
        Don&lsquo;t have an account?{" "}
        <Link href={"/register"} className="underline text-blue-700">
          Register
        </Link>
      </p>
    </form>
  );
};

export default LogInForm;
