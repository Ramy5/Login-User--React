import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Button from "../UI/Button";
import classes from "./Navigation.module.css";

const Navigation = () => {
  const ctx = useContext(AuthContext);

  const loggedoutHandler = (e) => {
    e.preventDefault();
    ctx.onLogout(false);
  };

  return (
    <nav className={classes.nav}>
      <ul className={classes.ul__list}>
        <li onClick={loggedoutHandler}>
          <a href="/">Users</a>
        </li>
        <li>
          <a href="/">Admin</a>
        </li>
        <li>
          <a href="/" onClick={loggedoutHandler}>
            <Button className={classes.nav__btn}>Logout</Button>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
