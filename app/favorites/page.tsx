import getFavorites from "../actions/getFavorites";
import getReservations from "../actions/getReservations";
import getUser from "../actions/getUser";
import ClientOnly from "../components/ClientOnly";
import Empty from "../components/Empty";
import MyFavorites from "./MyFavorites";

const Favorites = async () => {
  const logedInUser = await getUser();

  if (!logedInUser) {
    return (
      <ClientOnly>
        <Empty title="Unauthorized" subtitle="Login to see page" />
      </ClientOnly>
    );
  }

  const favorites = await getFavorites();

  if (favorites.length === 0) {
    return (
      <ClientOnly>
        <Empty
          title="Nothing found"
          subtitle="Awww! You have not add any places to your favorites"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <MyFavorites favorites={favorites} logedInUser={logedInUser} />
    </ClientOnly>
  );
};

export default Favorites;
