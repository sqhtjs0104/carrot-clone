"use server";

import { USERNAME_MIN_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constant";
import {z} from "zod";

const checkUsername = (username: string) => !username.includes("admin");
const checkPassword = ({ password, confirm_password }: { password: string; confirm_password: string }) => password === confirm_password;

const formSchema = z.object({
  username: z
    .string({
      invalid_type_error: "Must only string",
      required_error: "Required"
    })
    .min(USERNAME_MIN_LENGTH, "Too short")
    .toLowerCase()
    .trim()
    .transform((username) => `${username}🔥`)
    .refine(checkUsername, "Not allowed name"),
  email: z.string().email(),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
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

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}