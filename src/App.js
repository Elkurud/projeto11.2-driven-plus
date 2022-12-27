import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Subs from "./Components/Subs";
import GlobalStyle from "./styles/GlobalStyle";
import React from "react";
import UserContext from "./contexts/UserContext";


function App() {

  const tokenOnLocalStorage = localStorage.getItem("token");

  const [token, setToken] = React.useState(tokenOnLocalStorage);

  const config = {
    headers: {
      "Authorization": token
    }
  }

  function setAndPersistToken(token) {
		setToken(token);
		localStorage.setItem("token", token);
    
	}

  return (

    <UserContext.Provider value={{token, setToken, setAndPersistToken, config}}>
      <BrowserRouter>
        <GlobalStyle/>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>
            <Route path="/subscriptions" element={<Subs/>}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>

  );
}

export default App;
