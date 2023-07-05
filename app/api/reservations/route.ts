import { NextResponse } from "next/server";
import getUser from "@/app/actions/getUser";
import prisma from "@/app/libs/prismaDb";

export async function POST(request: Request) {
  const user = await getUser();

  if (!user) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { listingId, totalPrice, endDate, startDate } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const reserv = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: user.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(reserv);
}
