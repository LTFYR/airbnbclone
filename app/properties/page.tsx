import getFavorites from "../actions/getFavorites";
import getProperties from "../actions/getProperties";
import getReservations from "../actions/getReservations";
import getUser from "../actions/getUser";
import ClientOnly from "../components/ClientOnly";
import Empty from "../components/Empty";
import MyProperties from "./MyProperties";

const Properties = async () => {
  const logedInUser = await getUser();

  if (!logedInUser) {
    return (
      <ClientOnly>
        <Empty title="Unauthorized" subtitle="Login to see page" />
      </ClientOnly>
    );
  }

  const listings = await getProperties({
    userId: logedInUser.id,
  });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <Empty
          title="Nothing found"
          subtitle="Awww! You didn't create any properties"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <MyProperties listings={listings} logedInUser={logedInUser} />
    </ClientOnly>
  );
};

export default Properties;
