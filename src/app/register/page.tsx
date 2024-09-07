import RegisterForm from "@/components/forms/register-form";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

const Register = async () => {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="my-24">
      <h1 className="font-extrabold text-3xl text-center">
        Register a new account
      </h1>

      <RegisterForm />
    </div>
  );
};

export default Register;
