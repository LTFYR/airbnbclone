import prisma from "@/app/libs/prismaDb";
import { IParams } from "../interface";

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, listCreatorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }
    if (listCreatorId) {
      query.listing = { userId: listCreatorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((res) => ({
      ...res,
      createdAt: res.createdAt.toISOString(),
      startDate: res.startDate.toISOString(),
      endDate: res.endDate.toISOString(),
      listing: {
        ...res.listing,
        createdAt: res.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
