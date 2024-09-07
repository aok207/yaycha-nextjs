import { cn } from "@/lib/utils";
import React from "react";

const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("max-w-[95%] sm:max-w-[85%] mx-auto", className)}>
      {children}
    </div>
  );
};

export default Container;
