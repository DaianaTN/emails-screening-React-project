import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Page404 from "./pages/Page404";
import { initDatabase } from "./utils/initDatabase";
import { setUserStatus } from "./utils/setUserStatus";
import { LoginPage } from "./pages/LoginPage";
import { LeadsPage } from "./pages/LeadsPage";
import { OverviewPage } from "./pages/OverviewPage";
import userData from "./data/users.json";
import emailsData from "./data/leads.json";

const App = () => {
  const navigate = useNavigate();
  const users = userData;
  const [loggedInUserId, setLoggedInUserId] = useState();

  // initialize localstorage database
  useEffect(() => {
    initDatabase();
  }, []);

  useEffect(() => {
    // check if we have a logged-in user already
    const prevLoggedInUser = localStorage.getItem("userId");
    if (prevLoggedInUser) {
      setLoggedInUserId(prevLoggedInUser);
    }
  }, []);

  // logout button function
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
            <LoginPage users={users} setLoggedInUserId={setLoggedInUserId} />
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
        <Route path="/overview" element={<OverviewPage />} />

        {/* 404 Page */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};

export default App;
