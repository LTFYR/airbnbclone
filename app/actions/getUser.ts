import { getServerSession } from "next-auth/next";
import { auhtOptions } from "@/pages/api/auth/[...nextauth]";

import prisma from "@/app/libs/prismaDb";

export async function getSession() {
  return await getServerSession(auhtOptions);
}

export default async function getUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const logedInUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!logedInUser) {
      return null;
    }

    return {
      ...logedInUser,
      createdAt: logedInUser.createdAt.toISOString(),
      updatedAt: logedInUser.updatedAt.toISOString(),
      emailVerified: logedInUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}
