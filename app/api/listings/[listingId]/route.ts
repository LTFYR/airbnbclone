import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismaDb";
import { IParams } from "@/app/interface";
import getUser from "@/app/actions/getUser";

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
    throw new Error("Invalid id");
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: logedInUser.id,
    },
  });

  return NextResponse.json(listing);
}
