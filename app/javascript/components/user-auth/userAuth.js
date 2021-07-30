const getUserTokenCookie = () => {
  const fullCookie = document.cookie
    .split(';')
    .find(cookie => cookie.trim().slice(0, 10) === 'userToken=');
  if (!fullCookie) {
    return false;
  }
  return fullCookie.trim().slice(10);
};

const setUserTokenCookie = token => {
  const expirationDate = new Date();
  // // Set token to expire after 6 hours
  // expirationDate.setTime(expirationDate.getTime() + 6 * 60 * 60 * 1000);
  // Set token to expire aft 7 days
  expirationDate.setDate(expirationDate.getDate() + 7);
  document.cookie = `userToken=${token}; expires=${expirationDate.toUTCString()}; path=/`;
};

const removeUserTokenCookie = () => {
  document.cookie =
    'userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

export { setUserTokenCookie, getUserTokenCookie, removeUserTokenCookie };
