import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserStatus, setUserStatus } from "../utils/setUserStatus";
import styles from "./Login.module.css";

export const LoginForm = ({ users, setLoggedInUserId }) => {
  const [selectedUser, setSelectedUser] = useState();
  const navigate = useNavigate();

  //store the selected user in the state
  const handleChange = event => {
    setSelectedUser(event.target.value);
  };

  //find out the selected user status and act accordingly
  const handleClickLogin = () => {
    const selectedUserStatus = getUserStatus(selectedUser);
    if (selectedUserStatus === "active") {
      console.log("User already logged in");
      return;
    }

    setUserStatus(selectedUser, "active");
    setLoggedInUserId(selectedUser);
    navigate("/leads");
  };

  return (
    <div className={`${styles.loginForm}`}>
      <div>
        <form>
          <div className={`${styles.contentWrapperLogin}`}>
            <label className="p-3 text-center">
              Please select your username
            </label>
            <select onChange={handleChange}>
              <option value={undefined}>Select a user</option>
              {users.map((user, index) => (
                <option key={index} value={index}>
                  {user.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleClickLogin}
              disabled={!selectedUser}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
