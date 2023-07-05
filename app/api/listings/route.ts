import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismaDb";
import getUser from "@/app/actions/getUser";

export async function POST(request: Request) {
  const logedInUser = await getUser();

  if (!logedInUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    category,
    roomCount,
    guestCount,
    price,
    imageSrc,
    location,
    bathroomCount,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      category,
      roomCount,
      price: parseInt(price, 10),
      bathroomCount,
      guestCount,
      imageSrc,
      locationValue: location.value,
      userId: logedInUser.id,
    },
  });
  return NextResponse.json(listing);
}
