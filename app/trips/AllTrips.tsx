"use client";

import React, { useCallback, useState } from "react";
import { MyTripsProps } from "../interface";
import Container from "../components/Container";
import ModalHeading from "../components/ModalHeading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListCard from "../components/listings/ListCard";

const AllTrips: React.FC<MyTripsProps> = ({ reservations, logedInUser }) => {
  const router = useRouter();
  const [tripId, setTripId] = useState("");

  const cancelReservation = useCallback(
    (id: string) => {
      setTripId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled succesfully");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .then(() => {
          setTripId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <ModalHeading title="Trips" subtitle="Trips where you want to go" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-10 gap-8">
        {reservations.map((reservation) => (
          <ListCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            logedInUser={logedInUser}
            actionId={reservation.id}
            onAction={cancelReservation}
            disabled={tripId === reservation.id}
            actionLabel="Cancel reservation"
          />
        ))}
      </div>
    </Container>
  );
};

export default AllTrips;
