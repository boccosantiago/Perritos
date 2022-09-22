import { createContext } from "react";

const FavoriteContext = createContext({
    favoriteDogs: [],
    updateFavoriteDogs: (id) => null
});

export const FavoriteProvider = FavoriteContext.Provider;

export default FavoriteContext;