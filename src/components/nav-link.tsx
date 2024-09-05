"use client";

import { usePathname } from "next/navigation";
import React, { HTMLAttributes } from "react";
import Link from "next/link";

interface NavLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  activeClassName: string;
  nonActiveClassName: string;
}

const NavLink = ({
  children,
  href,
  activeClassName,
  nonActiveClassName,
  className,
  ...props
}: NavLinkProps) => {
  const pathName = usePathname();
  const isActive: boolean = pathName === href;
  const newClassName: string = `${
    isActive ? activeClassName : nonActiveClassName
  } ${className}`;

  return (
    <Link href={href} className={newClassName} {...props}>
      {children}
    </Link>
  );
};

export default NavLink;
