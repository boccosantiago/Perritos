import Main from '../Components/Main'
import Home from '../Components/Home'
import Profile from '../pages/Profile';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from "../Components/Navbar";
import Dogs from '../Components/Dogs';
import Map from '../Components/Maps/Maps'
import Login from "../pages/Login"
import Signup from "../pages/Register"
import Protected from "./Protected";
import Posts from "../Components/Posts/Posts";
import FavoriteList from '../Components/FavoriteList';
import Chat from "../pages/Chat"

export default function AppRoutes(props) {
  const { user } = useContext(AuthContext);

  //Login
  const [registeredName, setRegisteredName] = useState();

  async function getRegisteredName() {
    const auth = getAuth();
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setRegisteredName(docSnap.data().name);
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  console.log(registeredName);

  useEffect(() => getRegisteredName, [user]);

  
  return (
    <div className="App">
    <BrowserRouter>
      <Navbar setFavorites={setFavorites} registeredName={registeredName} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/main" element={<DogSearch />} />
        <Route
          path="/main/:id"
          element={
            <Protected>
              <InfoDog />
            </Protected>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/main/:id/formulario" element={<AdoptionForm />} />
        <Route path="/favorites" element={<FavoriteList />} />
        <Route
          path="/posts"
          element={<Posts registeredName={registeredName} />}
        />
        <Route path="/shelters" element={<Shelters />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/chat"
          element={
            <Protected>
              <MainChat />
            </Protected>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  </div>
  )
}