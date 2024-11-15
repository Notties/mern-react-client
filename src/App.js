import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [, setRecordData] = useState([]);

  const base_url =
    process.env.REACT_APP_NODE_ENV === "development"
      ? process.env.REACT_APP_LOCAL_BASE_URL
      : process.env.REACT_APP_SERVER_BASE_URL;

  useEffect(() => {
    axios
      .get(`${base_url}/getUsers`)
      .then((res) => {
        setRecordData(res.data);
      })
      .catch((err) => console.error(`Some error occured ==>${err}`));
  }, [base_url]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post(`${base_url}/addUser`, formData)
      .then((res) => {
        setFormData({ name: "", email: "" });
        console.log("User created successfully");
      })
      .catch((err) => console.error(`Some error occured ==>${err}`));
  };

  return (
    <div className="App">
      <div className="container">
        <div className="col">
          <div>
            <h2>MERN Stacks</h2>
          </div>
          <div className="col">
            <h2>Add Users</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label >User Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="exampleInputUser"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter user name"
                />
              </div>
              <div className="form-group">
                <label >Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </div>
              <button type="submit" className="btn btn-primary mt-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
