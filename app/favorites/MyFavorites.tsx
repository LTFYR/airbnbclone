import React from "react";
import { FavoritesProps } from "../interface";
import Container from "../components/Container";
import ModalHeading from "../components/ModalHeading";
import ListCard from "../components/listings/ListCard";

const MyFavorites: React.FC<FavoritesProps> = ({ favorites, logedInUser }) => {
  return (
    <Container>
      <ModalHeading
        title="Reservations"
        subtitle="Reservations which people take reservation on your properties"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-10 gap-8">
        {favorites.map((fav) => (
          <ListCard key={fav.id} data={fav} logedInUser={logedInUser} />
        ))}
      </div>
    </Container>
  );
};

export default MyFavorites;
