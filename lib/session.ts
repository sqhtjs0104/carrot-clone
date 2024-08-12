import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface ISessionContent {
  id?: number;
}

export default async function getSession() {
  return getIronSession<ISessionContent>(cookies(), {
    cookieName: "carrot-clone",
    password: process.env.COOKIE_PASSWORD!,
  });
}