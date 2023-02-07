import React, { useImperativeHandle, useRef } from "react";
import classes from "./Input.module.css";

const InputLogin = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  return (
    <div
      className={`${classes.login__box} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id} className={classes[`${props.type}__label`]}>
        {props.label}
      </label>
      <input
        ref={inputRef}
        id={props.id}
        type={props.type}
        className={`${classes[`login__box--${props.type}`]}`}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default InputLogin;
