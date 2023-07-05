import prisma from "@/app/libs/prismaDb";
import getUser from "./getUser";

export default async function getFavorites() {
  try {
    const logedInUser = await getUser();

    if (!logedInUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(logedInUser.favoriteIds || [])],
        },
      },
    });

    const safefav = favorites.map((fav) => ({
      ...fav,
      createdAt: fav.createdAt.toISOString(),
    }));

    return safefav;
  } catch (error: any) {
    throw new Error(error);
  }
}
