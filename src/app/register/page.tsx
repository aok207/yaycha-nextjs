import PasswordInput from "@/components/password-input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const Register = () => {
  return (
    <div className="my-24">
      <h1 className="font-extrabold text-3xl text-center">
        Register a new account
      </h1>

      <form
        action=""
        method="post"
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
        </div>

        <Button variant={"primary"} type="submit" className="mt-4">
          Register
        </Button>
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link href={"/login"} className="underline text-blue-700">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
