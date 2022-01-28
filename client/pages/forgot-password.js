import { useContext, useEffect, useState } from "react";

import { Context } from "../context";
import Link from "next/link";
import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //if user logged in redirect to homepage
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter email");
      return;
    }

    try {
      //check if user exists
      setLoading(true);
      const { data } = await axios.post("/api/forgot-password", { email });
      toast.success(
        "Check your email for a secret code. Note: This can take up to 5 minutes"
      );
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    // console.log({ code, email, newPassword, confirmNewPassword });
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post("/api/reset-password", {
        email,
        code,
        newPassword,
      });
      setLoading(false);
      setEmail("");
      setCode("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data);
    }
  };

  return (
    <>
      <h1 className="jumbotron d-flex justify-content-center align-items-center text-white">
        Forgot Password
      </h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={success ? handleResetPassword : handleSubmit}>
          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          {success && (
            <>
              <input
                type="text"
                className="form-control mb-4 p-4"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter secret code"
                required
              />
              <input
                type="password"
                className="form-control mb-4 p-4"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />

              <input
                type="password"
                className="form-control mb-4 p-4"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
            </>
          )}

          <button
            className="btn btn-primary btn-block p-2"
            disabled={loading || !email}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
