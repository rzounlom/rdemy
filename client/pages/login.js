import React, { useContext, useEffect, useState } from "react";

import { Context } from "../context";
import Link from "next/link";
import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const { email, password } = formValues;

  //state
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });

      dispatch({
        type: "LOGIN",
        payload: data,
      });

      //save in localStorage
      window.localStorage.setItem("user", JSON.stringify(data));
      router.push("/");
      setFormValues({
        email: "",
        password: "",
      });

      setLoading(false);
    } catch (error) {
      console.log(error);

      setFormValues({
        ...formValues,
        password: "",
      });

      toast.error(error.response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <>
      {" "}
      <h1 className="jumbotron d-flex justify-content-center align-items-center text-white">
        Login
      </h1>
      <div className="container col-md-4 offset-med-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            className="form-control mb-4 p-4"
            placeholder="Enter email"
            value={email}
            onChange={handleInputChange}
            required
          />

          <input
            name="password"
            type="password"
            className="form-control mb-4 p-4"
            placeholder="Enter password"
            value={password}
            onChange={handleInputChange}
            required
          />

          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={!email || !password}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>

        <p className="text-center pt-3">
          Not registered?{" "}
          <Link href="/register">
            <a>Register</a>
          </Link>
        </p>
        <p className="text-center">
          <Link href="/forgot-password">
            <a className="text-danger">Forgot password</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
