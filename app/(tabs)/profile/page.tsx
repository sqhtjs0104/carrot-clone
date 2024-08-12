import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      }
    });
    return user;
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  return <h1>Welcome! {user?.username}</h1>;
}