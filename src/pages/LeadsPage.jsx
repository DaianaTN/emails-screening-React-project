import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNextEmail } from "../components/FetchNextEmail";
import styles from "./LeadsPage.module.css";

export const LeadsPage = ({ users, loggedInUserId, logout, emails }) => {
  const user = users[loggedInUserId] || { name: "" };
  const navigate = useNavigate();
  const [emailIndex, setEmailIndex] = useState(0);
  const [seconds, setSeconds] = useState(120);

  //countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);
    if (seconds === 0) {
      alert(
        `Session expired
        Page will be refreshed because session has expired`
      );
      fetchNextEmail(emailIndex, setEmailIndex, emails);
      setSeconds(120);
    }
    return () => clearInterval(interval);
  }, [seconds]);

  //select option function for lead screening
  const selectOption = option => {
    if (option === 1) {
      let retrievedString = localStorage.getItem("emails");
      let parsedObject = JSON.parse(retrievedString);
      parsedObject[emailIndex].status = "positive";
      let modifiedndstrigifiedForStorage = JSON.stringify(parsedObject);
      localStorage.setItem("emails", modifiedndstrigifiedForStorage);
      setSeconds(120);
      fetchNextEmail(emailIndex, setEmailIndex, emails);
    } else if (option === 2) {
      let retrievedString = localStorage.getItem("emails");
      let parsedObject = JSON.parse(retrievedString);
      parsedObject[emailIndex].status = "neutral";
      let modifiedndstrigifiedForStorage = JSON.stringify(parsedObject);
      localStorage.setItem("emails", modifiedndstrigifiedForStorage);
      fetchNextEmail(emailIndex, setEmailIndex, emails);
      setSeconds(120);
    } else {
      let retrievedString = localStorage.getItem("emails");
      let parsedObject = JSON.parse(retrievedString);
      parsedObject[emailIndex].status = "not a lead";
      let modifiedndstrigifiedForStorage = JSON.stringify(parsedObject);
      localStorage.setItem("emails", modifiedndstrigifiedForStorage);
      fetchNextEmail(emailIndex, setEmailIndex, emails);
      setSeconds(120);
    }
  };

  return (
    <div className={`${styles.LeadsPage}`}>
      <nav>
        <h1>Welcome back, {user.name}</h1>

        {/* nav to overview page */}
        <button
          type="button"
          onClick={() => {
            navigate("/overview");
          }}
        >
          Overview
        </button>

        {/* logout button */}
        <button type="button" onClick={logout}>
          Logout
        </button>
      </nav>
      <main>
        {/* countdown */}
        <div className="countdown text-center">
          Time Left: {seconds} seconds
        </div>

        {/* Lead screening form options */}
        <form>
          <div>
            <div className="text-center">
              <button type="button" onClick={() => selectOption(1)}>
                Positive
              </button>
            </div>
            <div className="text-center">
              <button type="button" onClick={() => selectOption(2)}>
                Neutral
              </button>
            </div>
            <div className="text-center">
              <button type="button" onClick={() => selectOption(3)}>
                Not a Lead
              </button>
            </div>
          </div>

          {/* email representation on the page */}
          <div className={`${styles.LeadsPageEmails}`}>
            <div className="mt-4">
              {" "}
              <strong>Subject line:</strong> {emails[emailIndex].subject}
            </div>
            <div className="mt-1">
              {" "}
              <strong>Body:</strong> {emails[emailIndex].body}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};
