"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const PasswordInput = ({ name, ...props }: PasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        name={name}
        type={!isPasswordVisible ? "password" : "text"}
        {...props}
      />
      <button
        className="absolute top-1/2 transform -translate-y-1/2 right-4"
        aria-label="Show Password"
        onClick={() => setIsPasswordVisible((prev) => !prev)}
        type="button"
      >
        {isPasswordVisible ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
