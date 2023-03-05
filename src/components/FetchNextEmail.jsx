export const fetchNextEmail = (emailIndex, setEmailIndex, emails) => {
  const nextIndex = emailIndex + 1;
  if (nextIndex < emails.length) {
    setEmailIndex(nextIndex);
  }
};
