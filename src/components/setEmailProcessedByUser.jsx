export const setEmailProcessedByUser = (emails, user) => {
  emails.forEach(element => {
    element.byUser = user.name;
  });
};
