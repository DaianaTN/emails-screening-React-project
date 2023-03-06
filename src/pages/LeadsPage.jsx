import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LeadsPage.module.css";
import { getNextEmailIndex, updateEmailById } from "../api/emailsApi";

const STATUS_RESPONSES = {
  1: "positive",
  2: "neutral",
  3: "not a lead",
};

export const LeadsPage = ({ users, loggedInUserId, logout, emails }) => {
  const user = users[loggedInUserId] || { name: "" };
  const navigate = useNavigate();
  const [emailIndex, setEmailIndex] = useState(null);
  const [seconds, setSeconds] = useState(120);

  const displayNextEmail = () => {
    const nextIndex = getNextEmailIndex();
    setEmailIndex(nextIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);
    if (seconds === 0) {
      alert(
        `Session expired
        Page will be refreshed because session has expired`
      );
      clearInterval(interval);
      displayNextEmail();
      setSeconds(120);
    }
    displayNextEmail();
    return () => clearInterval(interval);
  }, [seconds]);

  //select option function for lead screening
  const selectOption = option => {
      updateEmailById(emailIndex, { status: STATUS_RESPONSES[option], byUser: user.name });
      displayNextEmail();
      setSeconds(120);
  };

  return (
    <div className={`${styles.LeadsPage}`}>
      <nav>
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

        <h1>Welcome back, {user.name}</h1>
      </nav>
      <main>
        {/* countdown */}
        <div className="countdown text-center">
          Time Left: {emailIndex !== null ? `${seconds} seconds` : '-'}
        </div>

        {/* Lead screening form options */}
        <form>
          <div style={{display: "flex", justifyContent: "center"}}>
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
          {emailIndex !== null ? (
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
          ) : <h2>No emails to process!</h2>}
        </form>
      </main>
    </div>
  );
};
