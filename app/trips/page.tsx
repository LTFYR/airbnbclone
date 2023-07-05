import getReservations from "../actions/getReservations";
import getUser from "../actions/getUser";
import ClientOnly from "../components/ClientOnly";
import Empty from "../components/Empty";
import AllTrips from "./AllTrips";

const TripsPage = async () => {
  const logedInUser = await getUser();

  if (!logedInUser) {
    return (
      <ClientOnly>
        <Empty title="Unauthorized" subtitle="Login to see page" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    userId: logedInUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <Empty
          title="Nothing found"
          subtitle="Awww! You have not reserved any trips"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <AllTrips reservations={reservations} logedInUser={logedInUser} />
    </ClientOnly>
  );
};

export default TripsPage;
