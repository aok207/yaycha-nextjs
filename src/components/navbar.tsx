import { Menu } from "lucide-react";
import React from "react";
import NavLink from "./nav-link";
import ThemeToggle from "./theme-toggle";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="w-full h-20 sticky top-0 bg-slate-50 dark:bg-nav-dark px-8 py-2 flex justify-between items-center shadow-md">
      <div className="flex gap-4 items-center">
        <button aria-label="Toggle Sidebar">
          <Menu className="text-black dark:text-white" />
        </button>
        <Link
          href="/"
          className="uppercase font-bold text-lg text-black dark:text-white"
        >
          yay
          <span className="text-purple-800">cha</span>
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        <NavLink
          href="/login"
          activeClassName="text-purple-700"
          nonActiveClassName="text-black dark:text-white"
          className="font-semibold text-sm"
        >
          Log In
        </NavLink>

        <NavLink
          href="/register"
          activeClassName="text-purple-700"
          nonActiveClassName="text-black dark:text-white"
          className="font-semibold text-sm"
        >
          Register
        </NavLink>

        <ThemeToggle />
      </div>
    </div>
  );
};

export default NavBar;
