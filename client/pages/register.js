import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const Register = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(`http://localhost:5000/api/register`, {
        formValues,
      });
      console.log("register response", data);

      setFormValues({
        name: "",
        email: "",
        password: "",
      });

      toast.success("User successfully created");
    } catch (error) {
      console.log(error);

      setFormValues({
        name: "",
        email: "",
        password: "",
      });

      toast.error(error.response.data);
    }
  };

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
            value={formValues.name}
            onChange={handleInputChange}
            required
          />

          <input
            name="email"
            type="email"
            className="form-control mb-4 p-4"
            placeholder="Enter email"
            value={formValues.email}
            onChange={handleInputChange}
            required
          />

          <input
            name="password"
            type="password"
            className="form-control mb-4 p-4"
            placeholder="Enter password"
            value={formValues.password}
            onChange={handleInputChange}
            required
          />

          <button type="submit" className="btn btn-block btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
