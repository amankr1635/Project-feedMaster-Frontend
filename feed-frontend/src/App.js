// // import logo from './Components/Img.png';
// import './App.css';
// import Navbar from './Components/Navbar.js';
// import {BrowserRouter,Routes,Route} from "react-router-dom";
// import Home from './Components/Home.js';
// import SignUP from './Components/SignUp.js';
// import SignIn from "./Components/SignIn.js";
// import MyPost from "./Components/myPost";
// // import 'react-share/style.css';

// function App() {
//   return (
//   <BrowserRouter>
//     <div className="App">
//       <Navbar/>
//       <Routes>
//         <Route path ="/" element={<Home/>}></Route>
//         <Route path ="/signUp" element={<SignUP/>}></Route>
//         <Route path ="/signIn" element={<SignIn/>}></Route>
//         <Route path="/myPosts/:userId" element={<MyPost/>}></Route>
//         {/* <Route path ="/profile" element={<profile/>}></Route>         */}
//       </Routes>
//     </div>
//     </BrowserRouter>
//   );
// }

// export default App;


import './App.css';
import Navbar from './Components/Navbar.js';
import { BrowserRouter, Routes, Route ,useParams} from "react-router-dom";
import Home from './Components/Home.js';
import SignUP from './Components/SignUp.js';
import SignIn from "./Components/SignIn.js";
import MyPost from "./Components/myPost";


function App() {
  const {userId} = useParams()
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar userId={localStorage.getItem("userId")}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUP />} />
          <Route path="/signIn" element={<SignIn />} />
          {/* <Route path="/myPost/:userId" element={<MyPost />} /> */}
          <Route path="/myPosts/:userId" element={<MyPost userId={userId} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;



// import React from 'react';
// import { Routes, Route } from "react-router-dom";
// import Navbar from './Components/Navbar';
// import MyPost from "./Components/myPost";
// import Home from './Components/Home';
// import SignIn from './Components/SignIn';
// import SignUp from './Components/SignUp';
// import { useAppState } from "./store/app.state";
// import './App.css';

// export default function App() {
//   const { userId } = useAppState(state => state);// replace with your user id

//   return (
//     <div className="App">
//       <Navbar userId={userId} />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/myPosts/:userId" element={<MyPost />} />
//         <Route path="/SignIn" element={<SignIn />} />
//         <Route path="/SignUp" element={<SignUp />} />
//       </Routes>
//     </div>
//   );
// }
