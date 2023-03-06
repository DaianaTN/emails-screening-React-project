export const getAllEmails = () => {
    const emails = localStorage.getItem("emails");
    if (emails) {
        return JSON.parse(emails);
    }
    return [];
};

export const getFilteredEmails = (key, value) => {
    const allEmails = getAllEmails();
    if (allEmails.length) {
        return allEmails.filter(email => email[key] === value);
    }
    return [];
};

export const getNextEmailIndex = () => {
  const allEmails = getAllEmails();
  if (allEmails.length) {
      const nextIndex = allEmails.findIndex(email => email.status === "pending");
      if (nextIndex !== -1)
          return nextIndex;
      return null;
  }
  return null;
};

export const updateEmailById = (id, data) => {
    const emails = getAllEmails();
    if (emails.length) {
        emails[id] = {...emails[id], ...data};
        localStorage.setItem("emails", JSON.stringify(emails));
    }
};
