// import logo from './Components/Img.png';
import './App.css';
import Navbar from './Components/Navbar.js';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './Components/Home.js';
import SignUP from './Components/SignUp.js';
import SignIn from "./Components/SignIn.js";

function App() {
  return (
  <BrowserRouter>
    <div className="App">
      <Navbar/>
  
      <Routes>
        <Route path ="/" element={<Home/>}></Route>
        <Route path ="/signUP" element={<SignUP/>}></Route>
        <Route path ="/signIn" element={<SignIn/>}></Route>
        <Route path ="/profile" element={<profile/>}></Route>        
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;