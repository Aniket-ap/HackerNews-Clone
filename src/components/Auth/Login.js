import React, { useState } from "react";
import {Link} from 'react-router-dom'

import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";

import firebase from "../../firebase";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

const Login = (props) => {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    isSubmitting,
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
  const [login, setLogin] = useState(true);
  const [firebaseError, setFirebaseError] = useState("")
  async function authenticateUser() {
    const { name, email, password } = values;
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
        props.history.push('/');
    } catch (error) {
      console.error("Authentication Error", error);
      setFirebaseError(error.message)
    }
  }

  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        {!login && (
          <input
            onChange={handleChange}
            type="text"
            name="name"
            value={values.name}
            placeholder="Your Name"
            autoComplete="off"
          />
        )}
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          name="email"
          value={values.email}
          className={errors.email && "error-input"}
          placeholder="Your Email"
          autoComplete="off"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          name="password"
          value={values.password}
          className={errors.password && "error-input"}
          placeholder="Enter Your Password"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {firebaseError && <p className="error-text">{firebaseError}</p>}

        <div className="flex mt3">
          <button
            type="submit"
            className="button pointer mr2"
            disabled={isSubmitting}
            style={{ background: isSubmitting ? "grey" : "orange" }}
          >
            Submit
          </button>
          <button
            type="button"
            className="pointer button"
            onClick={() => setLogin((prevLogin) => !prevLogin)}
          >
            {login ? "need to create an account?" : "already have an account?"}
          </button>
        </div>
      </form>
      <div className="forgot-password">
        <Link to="/forgot">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Login;
