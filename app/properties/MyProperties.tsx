"use client";

import React, { useCallback, useState } from "react";
import { OwnPropertiesProps } from "../interface";
import Container from "../components/Container";
import ModalHeading from "../components/ModalHeading";
import ListCard from "../components/listings/ListCard";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const MyProperties: React.FC<OwnPropertiesProps> = ({
  listings,
  logedInUser,
}) => {
  const [reservationId, setReservationId] = useState("");

  const router = useRouter();

  const deleteProperty = useCallback(
    (id: string) => {
      setReservationId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Your property is deleted");
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
        title="Properties"
        subtitle="The properties which you created"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-10 gap-8">
        {listings.map((list) => (
          <ListCard
            key={list.id}
            data={list}
            logedInUser={logedInUser}
            actionId={list.id}
            disabled={reservationId === list.id}
            onAction={deleteProperty}
            actionLabel="Delete listing"
          />
        ))}
      </div>
    </Container>
  );
};

export default MyProperties;
