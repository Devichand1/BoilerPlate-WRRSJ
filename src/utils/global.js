const isAuthenticated = () => {
  const auth = window.localStorage.getItem('authenticated');
  switch (auth) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return false;
  }
};

export default isAuthenticated;
