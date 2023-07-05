import { Listing, Reservation, User } from "@prisma/client";

export type SafeUserTypes = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeListingTypes = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type CountryValue = {
  label: string;
  latlng: number[];
  region: string;
  flag: string;
  value: string;
};

export type SafeReservationTypes = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListingTypes;
};
