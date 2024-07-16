import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

import "./Auth.css";
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import { signup, login } from "../../actions/auth";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsSignup(!isSignup);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      alert("Enter email and password.");
      return;
    }
    if (email && !password) {
      alert("Please enter password.");
      return;
    }
    if (!email && password) {
      alert("Please enter email.");
      return;
    }
    setLoading(true);
    if (isSignup) {
      if (!name) {
        alert("Enter a name to continue.");
        setLoading(false);
        return;
      }
      dispatch(signup({ name, email, password }, navigate)).finally(() =>
        setLoading(false)
      );
    } else {
      dispatch(login({ email, password }, navigate)).finally(() =>
        setLoading(false)
      );
    }
  };

  return (
    <section className="auth-section">
      {isSignup && <AboutAuth />}
      <div className="auth-container-2">
        {!isSignup && (
          <img src={icon} alt="stack overflow" className="login-logo" />
        )}
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label htmlFor="name">
              <h4>Name</h4>
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
          )}

          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>
              {!isSignup && (
                <p
                  style={{
                    color: "#007ac6",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                ></p>
              )}
            </div>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <div className="auth-button-container">
            {loading ? (
              <div className="loading-spinner">
                <Spin size="large" />
              </div>
            ) : (
              <button type="submit" className="auth-btn">
                {isSignup ? "Sign up" : "Log in"}
              </button>
            )}
          </div>
        </form>
        <p style={{ position: "relative", top: "-12px" }}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Auth;
