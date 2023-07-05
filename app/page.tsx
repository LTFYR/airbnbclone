import getProperties from "./actions/getProperties";
import getUser from "./actions/getUser";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import Empty from "./components/Empty";
import ListCard from "./components/listings/ListCard";
import { HomeProps } from "./interface";

export const dynamic = "force-dynamic";

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getProperties(searchParams);
  const logedInUser = await getUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <Empty showReset />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing) => (
            <ListCard
              key={listing.id}
              logedInUser={logedInUser}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
