import Main from '../Components/Main'
import Home from '../Components/Home'
import Profile from '../Components/Profile';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from "../Components/Navbar";
import Dogs from '../Components/Dogs';
import Map from '../Components/Maps/Maps'
import Login from "../Components/Login"
import Signup from "../Components/Signup"
import Protected from "./Protected";
import Posts from "../Components/Posts/Posts";
import FavoriteList from '../Components/FavoriteList';

export default function AppRoutes(props){
    return(
        <BrowserRouter>
              <Navbar setFavorites={props.setFavorites}/>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/main" element={<Main />} />
                <Route path="/main/:id" element={
                  <Protected ><Dogs /></Protected>}
                />
                <Route path="/profile" element={<Profile />} />
                <Route path="/favorites" element={<FavoriteList />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/maps" element={<Map />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* <Route path='/chat' element={<MainChat />} /> */}
              </Routes>
            </BrowserRouter>
    )
}