import { Link } from "react-router-dom";

export default function LinksNavbar() {
    return (
        <>
            <li>
                <Link to="/main">Adopta</Link>
            </li>
            <li>
                <Link to="/shelters">Protectoras</Link>
            </li>
            <li>
                <Link to="/about">Que es Perritos</Link>
            </li>
            <li>
                <Link to="/posts">Difunde</Link>
            </li>
            <li>
                <Link to="/chat">Chatea</Link>
            </li>
        </>
    )
}