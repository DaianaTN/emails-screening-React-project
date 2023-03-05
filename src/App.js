import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Page404 from "./pages/Page404";
import { initDatabase } from "./utils/initDatabase";
import { LoginForm } from "./pages/LoginForm";
import { LeadsPage } from "./pages/LeadsPage";
import userData from "./data/users.json";
import { setUserStatus } from "./utils/setUserStatus";
import emailsData from "./data/leads.json";
import { Overview } from "./pages/Overview";

const App = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(userData);
  const [loggedInUserId, setLoggedInUserId] = useState();

  // initialize localstorage database
  useEffect(() => {
    initDatabase();
  }, []);

  useEffect(() => {
    // check if we have a logged in user already
    const prevLoggedInUser = localStorage.getItem("userId");
    if (prevLoggedInUser) {
      setLoggedInUserId(prevLoggedInUser);
    }
  }, []);

  //logout button function
  const logout = () => {
    setUserStatus(loggedInUserId, "inactive");
    setLoggedInUserId(undefined);
    navigate("/");
  };

  return (
    <div className="App">
      <Routes>
        {/* Login page */}
        <Route
          path="/"
          element={
            <LoginForm users={users} setLoggedInUserId={setLoggedInUserId} />
          }
        />

        {/* Leads page */}
        <Route
          path="/leads"
          element={
            <LeadsPage
              users={users}
              loggedInUserId={loggedInUserId}
              logout={logout}
              emails={emailsData}
            />
          }
        />

        {/* Overview page */}
        <Route path="/overview" element={<Overview />} />

        {/* 404 Page */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};

export default App;
