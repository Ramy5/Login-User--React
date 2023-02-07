import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Navigation from "../navigation/Navigation";
import classes from "./Header.module.css";

const Header = () => {
  const ctx = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <h1 className={classes.header__head}>A Typical Page</h1>
      {ctx.isLoggedIn && <Navigation />}
    </header>
  );
};

export default Header;
