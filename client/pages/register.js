import React, { useContext, useEffect, useState } from "react";

import { Context } from "../context";
import Link from "next/link";
import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const { name, email, password } = formValues;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
      });

      setFormValues({
        name: "",
        email: "",
        password: "",
      });

      toast.success("User successfully created");
      setLoading(false);
    } catch (error) {
      console.log(error);

      setFormValues({
        name: "",
        email: "",
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
        Register
      </h1>
      <div className="container col-md-4 offset-med-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            className="form-control mb-4 p-4"
            placeholder="Enter name"
            value={name}
            onChange={handleInputChange}
            required
          />

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
            disabled={!name || !email || !password}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>

        <p className="text-center p-3">
          Already registered?{" "}
          <Link href="/login">
            <a>Login</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
