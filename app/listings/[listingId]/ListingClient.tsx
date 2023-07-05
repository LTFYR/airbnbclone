"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ListingClientProps } from "@/app/interface";
import { categories } from "@/app/utils/categories";
import Container from "@/app/components/Container";
import ListingHeading from "@/app/components/listings/ListingHeading";
import Information from "../../components/listings/Information";
import useLogin from "@/app/hooks/useLogin";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { toast } from "react-hot-toast";
import axios from "axios";
import ReservListing from "@/app/components/listings/ReservListing";
import { Range } from "react-date-range";

const inititalDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  logedInUser,
  reservations = [],
}) => {
  const login = useLogin();
  const router = useRouter();

  const reservedDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const loginAgain = () => {
    toast.error("You must login for take reservation");
    login.onOpen();
  };

  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<Range>(inititalDateRange);
  const [totalPrice, setTotalPrice] = useState(listing.price);

  const handleReservation = useCallback(() => {
    if (!logedInUser) {
      return login.onOpen();
    }

    setLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Reserved");
        setDateRange(inititalDateRange);

        router.push("/trips");
      })
      .catch(() => {
        toast.error("Error happened");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [totalPrice, listing?.id, router, logedInUser, login, dateRange]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const day = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (day && listing.price) {
        setTotalPrice(day * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const category = useMemo(() => {
    return categories.find((categ) => categ.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHeading
            id={listing.id}
            title={listing.title}
            logedInUser={logedInUser}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <Information
              user={listing.user}
              category={category}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              description={listing.description}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ReservListing
                price={listing.price}
                dateRange={dateRange}
                totalPrice={totalPrice}
                changeDate={(val) => setDateRange(val)}
                onSubmit={handleReservation}
                disabled={loading}
                reservedDates={reservedDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
