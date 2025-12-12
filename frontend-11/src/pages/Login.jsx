import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { auth } from "../firebase/firebase.init";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("login", location);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;
    signInWithEmailAndPassword(auth, email, pass)
      .then((result) => {
      navigate(location.state||'/')
        console.log(result);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div className="hero bg-base-200 py-40">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
            <div className="card-body w-96">
              <form className="fieldset" onSubmit={handleLogin}>
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  name="email"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  name="password"
                  placeholder="Password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Login</button>
              </form>
              <p>
                create account{" "}
                <Link className="text-yellow-400" to="/register">
                  register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
