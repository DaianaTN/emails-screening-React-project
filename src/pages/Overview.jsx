import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Overview = () => {
  const navigate = useNavigate();

  //buttons functions
  const handleBackClick = () => {
    navigate("/leads");
  };
  const handleResetClick = () => {
    localStorage.clear();
    navigate("/");
  };

  //emails array

  const emails = JSON.parse(localStorage.getItem("emails"));

  //replies
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
    <div>
      <div>
        <button onClick={handleResetClick}>Reset App</button>
        <h1>OVERVIEW</h1>
        <button onClick={handleBackClick}>Back</button>
        <div>
          <p>Positive replies: {positiveRepliesNo}</p>
          <p>Neutral replies: {neutralRepliesNo}</p>
          <p>Not a lead replies: {notALeadRepliesNo}</p>
        </div>
      </div>
      {emails.map(email => (
        <div>
          <p className="mt-5">
            Subject line: <strong>{email.subject}</strong>
          </p>
          <p>Body: {email.body}</p>
          <p>Status: {email.status}</p>
        </div>
      ))}
    </div>
  );
};
