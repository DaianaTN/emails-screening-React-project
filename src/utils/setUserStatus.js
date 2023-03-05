export const setUserStatus = (id, status) => {
  const localStorageUsers = JSON.parse(localStorage.getItem("users"));
  localStorageUsers[id].status = status;
  localStorage.setItem("users", JSON.stringify(localStorageUsers));

  if (status === "active") {
    localStorage.setItem("userId", id);
  } else {
    localStorage.removeItem("userId");
  }
};

export const getUserStatus = id => {
  const localStorageUsers = JSON.parse(localStorage.getItem("users"));
  return localStorageUsers[id].status;
};
