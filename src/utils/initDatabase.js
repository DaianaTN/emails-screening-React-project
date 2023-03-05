import userData from "../data/users.json";
import emailData from "../data/leads.json";

export const initDatabase = () => {
  if (localStorage.getItem("users")) {
    console.log(
      "we already have users!",
      JSON.parse(localStorage.getItem("users"))
    );
  } else {
    console.log("no users present, setting users");
    localStorage.setItem("users", JSON.stringify(userData));
  }

  if (localStorage.getItem("emails")) {
    console.log(
      "we already have emails!",
      JSON.parse(localStorage.getItem("emails"))
    );
  } else {
    console.log("no emails present, setting emails");
    localStorage.setItem("emails", JSON.stringify(emailData));
  }
};
