import getReservations from "../actions/getReservations";
import getUser from "../actions/getUser";
import ClientOnly from "../components/ClientOnly";
import Empty from "../components/Empty";
import MyReservations from "./MyReservations";

const ReservationsPage = async () => {
  const logedInUser = await getUser();

  if (!logedInUser) {
    return (
      <ClientOnly>
        <Empty title="Unauthorized" subtitle="Login to see page" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    listCreatorId: logedInUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <Empty
          title="Nothing found"
          subtitle="Awww! It seems like none of your properties has reserved yet"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <MyReservations reservations={reservations} logedInUser={logedInUser} />
    </ClientOnly>
  );
};

export default ReservationsPage;
