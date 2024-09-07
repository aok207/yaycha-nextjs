"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { logout } from "@/app/login/actions";
import Link from "next/link";

const Sidebar = ({ name }: { name: string }) => {
  const router = useRouter();
  const { toast } = useToast();

  // logout
  async function handleLogout() {
    await logout();
    router.replace("/login");
    toast({ title: "Success", description: "Logged out successfully!" });
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button aria-label="Toggle Sidebar">
          <Menu className="text-black dark:text-white" />
        </button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="h-full w-full flex flex-col justify-between"
      >
        <div className="flex flex-col gap-4 w-full">
          <SheetHeader>
            <SheetTitle>Hello, {name}...</SheetTitle>
          </SheetHeader>
          <SheetClose asChild>
            <Link href="/" className="w-full">
              <Button className="w-full">All posts</Button>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/my-posts" className="w-full">
              <Button className="w-full">Your posts</Button>
            </Link>
          </SheetClose>
        </div>
        <SheetClose asChild>
          <Button variant={"outline"} className="w-full" onClick={handleLogout}>
            Log Out
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
