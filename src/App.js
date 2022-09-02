import './App.css';
import Main from './Components/Main'
import Home from './Components/Home'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/main" element={<Main/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
