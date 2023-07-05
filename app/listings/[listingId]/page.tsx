import getListById from "@/app/actions/getListById";
import getUser from "@/app/actions/getUser";
import ClientOnly from "@/app/components/ClientOnly";
import Empty from "@/app/components/Empty";
import { IParams } from "@/app/interface";
import React from "react";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

const SingleList = async ({ params }: { params: IParams }) => {
  const list = await getListById(params);
  const logedInUser = await getUser();
  const reservation = await getReservations(params);

  if (!list) {
    return (
      <ClientOnly>
        <Empty />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        reservations={reservation}
        listing={list}
        logedInUser={logedInUser}
      />
    </ClientOnly>
  );
};

export default SingleList;
