"use client";

import PasswordInput from "@/components/shared/password-input";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import React from "react";
import SubmitButton from "@/components/shared/submit-button";
import { useFormState } from "react-dom";
import { register } from "@/app/register/actions";

const RegisterForm = () => {
  const [state, action] = useFormState(register, null);

  return (
    <form
      action={action}
      className="flex flex-col gap-4 w-full sm:w-1/3 mx-auto mt-14"
    >
      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="username">
          Username
        </label>
        <Input
          name="username"
          id="username"
          aria-label="Please enter your username."
          required
          aria-required
          autoComplete="off"
          type="text"
        />
        {state?.errors?.username && (
          <p className="text-sm text-red-600">{state.errors.username}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="email">
          Email
        </label>
        <Input
          name="email"
          id="email"
          type="email"
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

      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <PasswordInput
          name="confirmPassword"
          id="confirmPassword"
          aria-label="Please re-enter your password."
          aria-required
          autoComplete="off"
        />
        {state?.errors?.confirmPassword && (
          <p className="text-sm text-red-600">{state.errors.confirmPassword}</p>
        )}
      </div>

      <SubmitButton text="Register" className="mt-4" />
      <p className="text-center text-gray-600">
        Already have an account?{" "}
        <Link href={"/login"} className="underline text-blue-700">
          Log In
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
