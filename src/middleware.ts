import { updateSession } from "@/lib/session";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/", "/my-posts"],
};
