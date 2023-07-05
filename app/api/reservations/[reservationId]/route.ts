import getUser from "@/app/actions/getUser";
import { IParams } from "@/app/interface";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismaDb";

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const logedInUser = await getUser();

  if (!logedInUser) {
    return NextResponse.error();
  }
  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Wrong reservation Id");
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: logedInUser.id }, { listing: { userId: logedInUser.id } }],
    },
  });

  return NextResponse.json(reservation);
}
