import React from "react";

const FavoriteContext = React.createContext({
    favoriteDogs: [],
    updateFavoriteDogs: (id) => null
});

export const FavoriteProvider = FavoriteContext.Provider;

export default FavoriteContext;

