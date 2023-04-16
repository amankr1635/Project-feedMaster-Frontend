import './App.css';
import Navbar from './Components/Navbar.js';
import { BrowserRouter, Routes, Route ,useParams} from "react-router-dom";
import Home from './Components/Home.js';
import SignUP from './Components/SignUp.js';
import SignIn from "./Components/SignIn.js";
import MyPost from "./Components/myPost";


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUP />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/myPosts/:userId" element={<MyPost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;