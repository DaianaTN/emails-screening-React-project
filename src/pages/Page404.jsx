import React from "react";
import styles from "./Page404.module.css";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

function Page404() {
  return (
    <div
      className={`${styles.page404} bg-primary text-white d-flex flex-column justify-content-center align-items-center`}
    >
      <Container className="d-flex flex-column justify-content-center align-items-center">
        <p className="h4 text-center">The page doesn't exist</p>
        <strong className={`${styles.error404}`}>404 :(</strong>
        <Link to="/" className="h4 text-center">
          Back to website!
        </Link>
      </Container>
    </div>
  );
}

export default Page404;
