import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initDatabase } from "../utils/initDatabase";
import styles from "./Overview.module.css";

export const Overview = () => {
  const navigate = useNavigate();

  //function for buttons
  const handleBackClick = () => {
    navigate("/leads");
  };
  const handleResetClick = () => {
    localStorage.clear();
    navigate("/");
    initDatabase();
  };

  //emails array from localStorage
  const emails = JSON.parse(localStorage.getItem("emails"));

  //types of replies
  const positiveRepliesNo = emails
    .filter(email => email.status === "positive")
    .map(email => email.email).length;

  const neutralRepliesNo = emails
    .filter(email => email.status === "neutral")
    .map(email => email.email).length;

  const notALeadRepliesNo = emails
    .filter(email => email.status === "not a lead")
    .map(email => email.email).length;

  return (
    <div className={`${styles.Overview}`}>
      <nav>
        <button onClick={handleResetClick}>Reset App</button>
        <button onClick={handleBackClick}>Back</button>
        <h1>OVERVIEW</h1>
      </nav>
      <main>
        <section>
          <p>Positive replies: {positiveRepliesNo}</p>
          <p>Neutral replies: {neutralRepliesNo}</p>
          <p>Not a lead replies: {notALeadRepliesNo}</p>
        </section>

        {emails
          .filter(email => email.status !== "pending")
          .map(email => (
            <div className={`${styles.emailWrapper}`}>
              <p>
                <strong>Subject line: </strong>
                {email.subject}
              </p>
              <p>
                <strong>Body: </strong> {email.body}
              </p>
              <p>
                <strong>Status: </strong> {email.status}
              </p>
              {/* <p>
                <strong>Processed by {email.byUser}</strong>
              </p> */}
            </div>
          ))}
      </main>
    </div>
  );
};
