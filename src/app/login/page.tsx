import LogInForm from "@/components/forms/login-form";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

const LogIn = async () => {
  const session = await getSession();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="my-24">
      <h1 className="font-extrabold text-3xl text-center">
        Log in to your account
      </h1>
      <LogInForm />
    </div>
  );
};

export default LogIn;
