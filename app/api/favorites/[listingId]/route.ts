import { NextResponse } from "next/server";
import getUser from "@/app/actions/getUser";
import prisma from "@/app/libs/prismaDb";
import { IParams } from "@/app/interface";

export async function POST(request: Request, { params }: { params: IParams }) {
  const logedInUser = await getUser();

  if (!logedInUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Something went wrong with that ID");
  }

  let favoriteIds = [...(logedInUser.favoriteIds || [])];

  favoriteIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: logedInUser.id,
    },
    data: {
      favoriteIds,
    },
  });
  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const logedInUser = await getUser();

  if (!logedInUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Something went wrong with that ID");
  }

  let favoriteIds = [...(logedInUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: logedInUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}
