export const LeadsPage = ({ users, loggedInUserId, logout }) => {
  const user = users[loggedInUserId] || { name: "" };
  return (
    <>
      <p>Welcome to leads page, {user.name}</p>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </>
  );
};
