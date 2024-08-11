"use server";

import { USERNAME_MIN_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constant";
import db from "@/lib/db";
import {z} from "zod";
import bcrypt from "bcrypt"
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const checkUsername = (username: string) => !username.includes("admin");
const checkPassword = ({ password, confirm_password }: { password: string; confirm_password: string }) => password === confirm_password;
const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  
  return !Boolean(user);
}
const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
    },
  });
  
  return !Boolean(user);
}

const formSchema = z.object({
  username: z
    .string({
      invalid_type_error: "Must only string",
      required_error: "Required"
    })
    .min(USERNAME_MIN_LENGTH, "Too short")
    .toLowerCase()
    .trim()
    // .transform((username) => `${username}🔥`)
    .refine(checkUsername, "Not allowed name")
    .refine(checkUniqueUsername, "Already exists"),
  email: z
    .string()
    .email()
    .refine(checkUniqueEmail, "Already exists"),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH),
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  confirm_password: z
    .string()
    .min(PASSWORD_MIN_LENGTH),
}).refine(checkPassword, {
  message: "Check both password",
  path: ["confirm_password"],
});

export async function createAccount(prevState: any, formData: FormData){
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  }

  const result = await formSchema.safeParseAsync(data);
  
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      }
    });

    const session = await getSession();
    session.id = user.id;
    await session.save();

    redirect("/profile");
  }
}