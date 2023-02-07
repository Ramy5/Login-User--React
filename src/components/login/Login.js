import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import AuthContext from "../../context/AuthContext";
import Button from "../UI/Button";
import Card from "../UI/Card";
import InputLogin from "../UI/Input";
import classes from "./Login.module.css";

const emailReducer = (state, action) => {
  if (action.type === "EMAIL_VALUE") {
    return { value: action.value, isValid: action.value.includes("@") };
  }

  if (action.type === "EMAIL_VALID") {
    return { value: state.value, isValid: state.value.includes("@") };
  }

  return { value: "", isValid: null };
};

const passwordReducer = (state, action) => {
  if (action.type === "PASSWORD_VALUE") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }

  if (action.type === "PASSWORD_VALID") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: "", isValid: null };
};

const Login = () => {
  const [formIsvalid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const emailRef = useRef();
  const passwordRef = useRef();

  const ctx = useContext(AuthContext);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);

    return () => clearTimeout(identifier);
  }, [emailState.isValid, passwordState.isValid]);

  const changeEmailHandler = (e) =>
    dispatchEmail({ type: "EMAIL_VALUE", value: e.target.value });

  const validEmailHandler = () => dispatchEmail({ type: "EMAIL_VALID" });

  const changePasswordHandler = (e) =>
    dispatchPassword({ type: "PASSWORD_VALUE", value: e.target.value });

  const validPasswordHandler = () =>
    dispatchPassword({ type: "PASSWORD_VALID" });

  const submitHandler = (e) => {
    e.preventDefault();

    if (formIsvalid) {
      ctx.onLogin(formIsvalid);

      dispatchEmail({ value: "", isValid: null });
      dispatchPassword({ value: "", isValid: null });
    } else if (!emailState.isValid) {
      emailRef.current.focus();
    } else {
      passwordRef.current.focus();
    }
  };

  return (
    <Card>
      {ctx.isLoggedIn && (
        <h2 className={classes.login_header}>Welcome back!</h2>
      )}
      {!ctx.isLoggedIn && (
        <form className={classes.login__form} onSubmit={submitHandler}>
          <InputLogin
            id="email"
            label="E-Mail"
            type="email"
            ref={emailRef}
            isValid={emailState.isValid}
            value={emailState.value}
            onChange={changeEmailHandler}
            onBlur={validEmailHandler}
          />
          <InputLogin
            id="password"
            label="Password"
            type="password"
            ref={passwordRef}
            isValid={passwordState.isValid}
            value={passwordState.value}
            onChange={changePasswordHandler}
            onBlur={validPasswordHandler}
          />
          <Button type="submit" className={classes.login__btn}>
            Login
          </Button>
        </form>
      )}
    </Card>
  );
};

export default Login;
