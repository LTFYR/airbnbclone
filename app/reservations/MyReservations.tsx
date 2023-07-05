"use client";

import React, { useCallback, useState } from "react";
import { MyReservationsProps } from "../interface";
import Container from "../components/Container";
import ModalHeading from "../components/ModalHeading";
import ListCard from "../components/listings/ListCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const MyReservations: React.FC<MyReservationsProps> = ({
  reservations,
  logedInUser,
}) => {
  const [reservationId, setReservationId] = useState("");

  const router = useRouter();

  const cancelReservation = useCallback(
    (id: string) => {
      setReservationId(id);

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
          setReservationId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <ModalHeading
        title="Reservations"
        subtitle="Reservations which people take reservation on your properties"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-10 gap-8">
        {reservations.map((reservation) => (
          <ListCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            logedInUser={logedInUser}
            actionId={reservation.id}
            onAction={cancelReservation}
            disabled={reservationId === reservation.id}
            actionLabel="Cancel reservation"
          />
        ))}
      </div>
    </Container>
  );
};

export default MyReservations;
