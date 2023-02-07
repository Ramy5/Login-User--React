import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: () => {},
  onLogout: () => {},
});

export const AuthContextProvider = (props) => {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const storage = localStorage.getItem("logging");
    if (storage === "1") setLogin(true);
  }, []);

  const loginHandler = (loggedIn) => {
    localStorage.setItem("logging", "1");
    setLogin(loggedIn);
  };

  const logoutHandler = (loggedOut) => {
    localStorage.removeItem("logging");
    setLogin(loggedOut);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: login,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
