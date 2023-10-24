"use server";
import { prisma } from "./../prisma";

import { User } from "@prisma/client";

import sendMail from "../sendMail";
import { activationTemplate } from "@/templates/acitvation";
import * as handlebars from "handlebars";
import { signJwtAccessToken, verifyJwt } from "../jwt";
import { resetPasswordEmailTemplate } from "@/templates/resetPassword";
import * as bcrypt from "bcrypt";

export async function registerUser(user: Omit<User, "id">) {
  const result = await prisma.user.create({
    data: {
      ...user,
      password: await bcrypt.hash(user.password, 10),
    },
  });

  const template = handlebars.compile(activationTemplate);

  const jwtUserId = await signJwtAccessToken({
    id: result.id,
  });
  const htmlEmail = template({
    name: result.firstName,
    activation_link: `${process.env.NEXTAUTH_URL}/auth/activate/${jwtUserId}`,
  });
  await sendMail(
    result.email,
    result.firstName,

    "activate your account",
    htmlEmail
  );

  return result;
}

type ActivateUser = (
  jwtUserId: string
) => Promise<
  "userNotExist" | "AlreadyActivated" | "Success"
>;
export const activateUser: ActivateUser = async (
  jwtUserId
) => {
  const payload = verifyJwt(jwtUserId);
  const userID = payload?.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userID,
    },
  });
  if (!user) {
    return "userNotExist";
  }
  if (user.emailVerified) {
    return "AlreadyActivated";
  }
  const result = await prisma.user.update({
    where: {
      id: userID,
    },
    data: {
      emailVerified: new Date(),
    },
  });
  return "Success";
};

export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new Error("user does not exist");

  const template = handlebars.compile(
    resetPasswordEmailTemplate
  );

  const jwtUserId = await signJwtAccessToken({
    id: user.id,
  });
  const htmlEmail = template({
    name: user.firstName,
    reset_url: `${process.env.NEXTAUTH_URL}/auth/reset/${jwtUserId}`,
  });
  await sendMail(
    user.email,
    user.firstName,

    "Reset Your Password",
    htmlEmail
  );
  return true;
}

type ResetPassword = (
  jwtUserId: string,
  password: string
) => Promise<"userNotExist" | "Success">;
export const resetPassword: ResetPassword = async (
  jwtUserId,
  password
) => {
  const payload = verifyJwt(jwtUserId);
  const userID = payload?.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userID,
    },
  });
  if (!user) {
    return "userNotExist";
  }
  const result = await prisma.user.update({
    where: {
      id: userID,
    },
    data: {
      password: await bcrypt.hash(password, 10),
    },
  });
  if (result) return "Success";
  else throw new Error("something went wrong!");
};
