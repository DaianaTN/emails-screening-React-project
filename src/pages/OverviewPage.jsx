import { useNavigate } from "react-router-dom";
import { initDatabase } from "../utils/initDatabase";
import { getAllEmails, getFilteredEmails } from "../api/emailsApi";
import styles from "./OverviewPage.module.css";

export const OverviewPage = () => {
  const navigate = useNavigate();

  // function for buttons
  const handleBackClick = () => {
    navigate("/leads");
  };
  const handleResetClick = () => {
    localStorage.clear();
    navigate("/");
    initDatabase();
  };

  // emails array from localStorage
  const emails = getAllEmails();

  // types of replies
  const positiveReplies = getFilteredEmails("status", "positive");
  const neutralReplies = getFilteredEmails("status", "neutral");
  const notALeadReplies = getFilteredEmails("status", "not a lead");

  return (
    <div className={`${styles.Overview}`}>
      <nav>
        <button onClick={handleResetClick}>Reset App</button>
        <button onClick={handleBackClick}>Back</button>
        <h1>OVERVIEW</h1>
      </nav>
      <main>
        <section>
          <p>Positive replies: {positiveReplies.length}</p>
          <p>Neutral replies: {neutralReplies.length}</p>
          <p>Not a lead replies: {notALeadReplies.length}</p>
        </section>

        {emails
          .filter(email => email.status !== "pending")
          .map((email, index) => (
            <div key={index} className={`${styles.emailWrapper}`}>
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
              <p>
                <strong>Processed by {email.byUser}</strong>
              </p>
            </div>
          ))}
      </main>
    </div>
  );
};
