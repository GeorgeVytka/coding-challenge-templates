import React, { useState, useEffect } from "react";
import axios from "axios";
import FormInput from "../../componenets/form-input/form-input";
import Button from "../../componenets/button/Button";
import Checkbox from "../../componenets/checkbox/checkbox";
import styles from "../notification-form/NotificationForm.module.css";
const defaultFormFields = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  supervisor: "",
};

const NotificationForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [supervisorList, setSupervisorList] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSupervisor = async () => {
      try {
        const { data: response } = await axios.get(
          "http://localhost:8083/api/supervisors"
        );
        console.log("()()()()", response);
        // setSupervisorList(response);
        // setIsLoading(false);
        setSupervisorList(response.supervisors);
        //console.log("---", supervisorList.data.supervisors);
      } catch (e) {
        console.log(e);
        setError(e);
      }
      setLoading(false);

      return {
        supervisorList,
        loading,
      };
    };
    getSupervisor();
  }, []);

  const { firstName, lastName, email, phoneNumber, supervisor } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    const tempUrl = "http://localhost:8083";
    event.preventDefault();
    console.log(formFields.supervisors);

    try {
      const response = axios.put(`${tempUrl}/api/submit`, formFields);
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Notification-Form</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.innerFormContainer}>
          <FormInput
            label="First Name"
            type="text"
            required
            onChange={handleChange}
            name="firstName"
            value={firstName}
          />

          <FormInput
            label="Last Name"
            type="text"
            required
            onChange={handleChange}
            name="lastName"
            value={lastName}
          />
        </div>
        <div className={styles.notifiedMessage}>
          <p>How will you prefer to be notified?</p>
        </div>

        <div className={styles.innerFormContainer}>
          <div className={styles.FormContainer}>
            <Checkbox
              label="Email"
              type="checkbox"
              id="topping"
              name="topping"
              value="Paneer"
            />
            <FormInput
              label="Email"
              type="email"
              onChange={handleChange}
              name="email"
              value={email}
            />
          </div>

          <div className={styles.FormContainer}>
            <Checkbox
              label="Phone Number"
              type="checkbox"
              id="topping"
              name="topping"
              value="Paneer"
            />
            <FormInput
              label="Phone Number"
              type="tel"
              onChange={handleChange}
              name="phoneNumber"
              value={phoneNumber}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: "60px",
            marginBottom: "-50px",
          }}
        >
          <label for="supervisor">Supervisor</label>
        </div>
        {loading && <div>Loading</div>}
        {!loading && (
          <div className={styles.dropDownContainer}>
            <select
              onChange={handleChange}
              name="supervisor"
              id="supervisor"
              style={{ width: "300px", height: "40px" }}
            >
              {Object.values(supervisorList).map((supervisor, index) => (
                <option key={index} value={supervisor.firstName}>
                  {supervisor.firstName}
                </option>
              ))}
            </select>
          </div>
        )}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default NotificationForm;
