import { useContext } from "react";
import FavoriteContext from "../context/favoritesContext";

export default function FavoriteList(props) {
    const { favoriteDogs } = useContext(FavoriteContext);
    console.log(favoriteDogs)
    console.log(props)
    return (
        <div>

        </div>
    )

}