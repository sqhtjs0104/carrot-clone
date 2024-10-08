"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { login } from "./actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constant";

export default function LogIn() {
  const [state, action] = useFormState(login, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          errors={state?.fieldErrors.email}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          errors={state?.fieldErrors.password}
          required
          minLength={PASSWORD_MIN_LENGTH}
        />
        <Button text="Log in" />
      </form>
      <SocialLogin />
    </div>
  );
}