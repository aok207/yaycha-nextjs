/* eslint-disable @typescript-eslint/no-explicit-any */
import { JWTVerifyResult, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const key = new TextEncoder().encode(process.env.SECRET_KEY);

const cookie = {
  name: "session",
  options: { httpOnly: true, secure: true },
  duration: 24 * 60 * 60 * 1000 * 15,
};

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
}

export async function decrypt(session: string | Uint8Array) {
  try {
    const decoded: JWTVerifyResult<{
      user: { id: string; name: string };
      expires: number;
      iat: number;
      exp: number;
    }> = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return decoded.payload;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getSession() {
  const session = cookies().get("session")?.value;

  if (!session) return null;
  return await decrypt(session);
}

export async function createSession({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const expires = Date.now() + cookie.duration;
  const session = await encrypt({ user: { id, name }, expires });

  cookies().set(cookie.name, session, { ...cookie.options, expires });
}

export async function updateSession(req: NextRequest) {
  const session = req.cookies.get("session")?.value;

  if (!session) return NextResponse.redirect(new URL("/login", req.url));

  const parsed = await decrypt(session);

  if (!parsed?.user) return NextResponse.redirect(new URL("/login", req.url));

  if (parsed?.expires < Date.now()) {
    parsed.expires = Date.now() + cookie.duration;
  }

  const userPayload = {
    user: parsed?.user,
    expires: parsed?.expires,
  };

  const res = NextResponse.next();
  res.cookies.set({
    name: cookie.name,
    value: await encrypt(userPayload),
    expires: parsed.expires,
    ...cookie.options,
  });

  return res;
}

export async function deleteSession() {
  cookies().set("session", "", { expires: new Date(0) });
}
