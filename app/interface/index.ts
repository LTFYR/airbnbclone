import { Listing, Reservation, User } from "@prisma/client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";
import {
  CountryValue,
  SafeListingTypes,
  SafeReservationTypes,
  SafeUserTypes,
} from "../types";
import { Range, RangeKeyDict } from "react-date-range";

interface ContainerProps {
  children: React.ReactNode;
}

interface MenuModalProps {
  onClick: () => void;
  label: string;
}

interface AvatarProps {
  src?: string | null | undefined;
}

interface CategoryProps {
  icon: IconType;
  selected?: boolean;
  label: string;
}

interface RentStore {
  isExpanded: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface ClientOnlyProps {
  children: React.ReactNode;
}

interface ModalProps {
  isExpanded?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  label: string;
  secondaryAction?: () => void;
  disabled?: boolean;
  secondaryLabel?: string;
}

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  little?: boolean;
  outline?: boolean;
  icon?: IconType;
}

interface RegisterStore {
  isExpanded: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface LoginStore {
  isExpanded: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface SearchStore {
  isExpanded: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface InputProps {
  id: string;
  type?: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  formatPrice?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

interface ModalHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

interface UserProps {
  loggedInUser?: SafeUserTypes | null;
}

interface NavbarProps {
  loggedInUser?: SafeUserTypes | null;
}

interface CategorySelectProps {
  onClick: (value: string) => void;
  label: string;
  selected?: boolean;
  icon: IconType;
}

interface CountrySelectProps {
  value?: CountryValue;
  onChange: (value: CountryValue) => void;
}

interface MapProps {
  center?: number[];
}

interface CounterProps {
  title: string;
  value: number;
  subtitle: string;
  onChange: (value: number) => void;
}

interface CloudinaryImageProps {
  onChange: (value: string) => void;
  value: string;
}

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

interface ListCardProps {
  data: SafeListingTypes;
  reservation?: SafeReservationTypes;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionId?: string;
  actionLabel?: string;
  logedInUser?: SafeUserTypes | null;
}

interface HeartButtonProps {
  listingId: string;
  logedInUser?: SafeUserTypes | null;
}

interface IParams {
  listingId?: string;
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  category?: string;
  locationValue?: string;
  reservationId?: string;
  listCreatorId?: string;
}

interface IUseFavorite {
  listingId: string;
  logedInUser?: SafeUserTypes | null;
}

interface ListingClientProps {
  reservations?: SafeReservationTypes[];
  logedInUser?: SafeUserTypes | null;
  listing: SafeListingTypes & { user: SafeUserTypes };
}

interface MyTripsProps {
  reservations: SafeReservationTypes[];
  logedInUser?: SafeUserTypes | null;
}

interface MyReservationsProps {
  reservations: SafeReservationTypes[];
  logedInUser?: SafeUserTypes | null;
}

interface ListingHeadingProps {
  title: string;
  locationValue: string;
  id: string;
  imageSrc: string;
  logedInUser?: SafeUserTypes | null;
}

interface ListingInformationProps {
  user: SafeUserTypes;
  description: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
}

interface ReserevationProps {
  totalPrice: number;
  price: number;
  dateRange: Range;
  changeDate: (val: Range) => void;
  reservedDates: Date[];
  disabled?: boolean;
  onSubmit: () => void;
}

interface CalendarProps {
  changeDate: (val: RangeKeyDict) => void;
  reservedDates?: Date[];
  value: Range;
}

interface ListingCategoryProps {
  icon: IconType;
  label: string;
  description: string;
}

interface FavoritesProps {
  favorites: SafeListingTypes[];
  logedInUser?: SafeUserTypes | null;
}

interface PropertiesProps {
  favorites: SafeListingTypes[];
  logedInUser?: SafeUserTypes | null;
}

interface OwnPropertiesProps {
  listings: SafeListingTypes[];
  logedInUser?: SafeUserTypes | null;
}

interface HomeProps {
  searchParams: IParams;
}

export type {
  IParams,
  HomeProps,
  PropertiesProps,
  ReserevationProps,
  CalendarProps,
  FavoritesProps,
  ListingCategoryProps,
  ListingHeadingProps,
  ListingInformationProps,
  ListingClientProps,
  IUseFavorite,
  UserProps,
  MapProps,
  MyTripsProps,
  HeartButtonProps,
  ListCardProps,
  EmptyStateProps,
  OwnPropertiesProps,
  MyReservationsProps,
  CloudinaryImageProps,
  CounterProps,
  MenuModalProps,
  CategorySelectProps,
  CountrySelectProps,
  RegisterStore,
  InputProps,
  NavbarProps,
  RentStore,
  LoginStore,
  AvatarProps,
  SearchStore,
  CategoryProps,
  ModalHeadingProps,
  ButtonProps,
  ClientOnlyProps,
  ContainerProps,
  ModalProps,
};
