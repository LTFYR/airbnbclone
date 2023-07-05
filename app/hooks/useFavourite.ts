import { useRouter } from "next/navigation";
import axios from "axios";
import useLogin from "./useLogin";
import { IUseFavorite } from "../interface";
import React, { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

const useFavourite = ({ listingId, logedInUser }: IUseFavorite) => {
  const router = useRouter();
  const login = useLogin();

  const isAddedFavorites = useMemo(() => {
    const singleList = logedInUser?.favoriteIds || [];

    return singleList.includes(listingId);
  }, [logedInUser, listingId]);

  const handleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!logedInUser) {
        return login.onOpen();
      }

      try {
        let req;

        if (isAddedFavorites) {
          req = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          req = () => axios.post(`/api/favorites/${listingId}`);
        }

        await req();
        router.refresh();
        toast.success("Done");
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [logedInUser, listingId, isAddedFavorites, login, router]
  );

  return { isAddedFavorites, handleFavorite };
};

export default useFavourite;
