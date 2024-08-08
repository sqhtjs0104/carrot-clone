import { PrismaClient } from "@prisma/client";
import { connect } from "http2";

const db = new PrismaClient();

export async function test() {
  const token = await db.sMSToken.create({
    data: {
      token: "123213",
      user: {
        connect: {
          id: 1
        }
      }
    },
  });
  console.log(token);
}

export default db;