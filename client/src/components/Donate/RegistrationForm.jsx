import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import TimePicker from "react-bootstrap-time-picker";

import MySpinner from "../Spinner";
import { genderObject, bloodGroupObject } from "../../variables/options";
import { postForm } from "../../utils/postData";
import validateForm from "../../utils/validations/validateForm";
import "./donate.css"

const RegistrationForm = ({ centersData }) => {
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    address: "",
    dob: "",
    blood_grp: "",
    sex: "",
    phone: "",
    email: "",
    center_id: "",
    app_date: "",
    app_time: 0,
  });

  const [errors, setErrors] = useState({});

  const [response, setResponse] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [Tnc, setTnc] = useState(false);

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }

    // console.log(field, value);
    // console.log(form);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const submitRequest = async () => {
      try {
        const res = await postForm(form);
        setIsLoading(false);
        setIsSubmitted(true);
        setResponse(res);
        console.log("form submitted");
        console.log(res);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    const formErrors = validateForm(form);

    if (Object.keys(formErrors).length > 0) {
      setIsLoading(false); // Spinner should be disabled
      setErrors(formErrors);
    } else if (!Tnc) {
      // Check if T&C accpeted before submit
      alert("Please accept the Terms and Conditions.");
      setIsLoading(false);
    } else {
      // Form is valid
      console.log(form);
      submitRequest();
    }
  };

  const handleTimeChange = (time) => {
    let hour = Math.floor(time / 3600);
    let minute = (time % 3600) / 60;
    let timeString = `${hour}:${minute ? minute : "00"}`;
    setField("app_time", timeString);
  };

  return (
    <Form>
      {/* --------------------------------------------------------------------- */}
      {/* --------------------------------------------------------------------- */}
      {/* Personal Information => First name, Last name, Gender, Blood Group, Address*/}
      {/* --------------------------------------------------------------------- */}
      {/* --------------------------------------------------------------------- */}
      <h2 className="form-section">Personal Information</h2>
      <Row className="mb-5">
        <InputGroup size="lg" as={Col}>
          <InputGroup.Text>Donor Name</InputGroup.Text>
          <Form.Control
            type="plaintext"
            placeholder="First and Middle name"
            value={form.fname}
            onChange={(e) => setField("fname", e.target.value)}
            isInvalid={!!errors.fname}
          />
          <Form.Control.Feedback type="invalid">
            {errors.fname}
          </Form.Control.Feedback>

          <Form.Control
            type="plaintext"
            placeholder="Last name"
            value={form.lname}
            onChange={(e) => setField("lname", e.target.value)}
            isInvalid={!!errors.lname}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lname}
          </Form.Control.Feedback>
        </InputGroup>
      </Row>

      {/* Gender, Blood Group */}
      <Row className="mb-5">
        <InputGroup size="lg" as={Col}>
          <InputGroup.Text>Gender</InputGroup.Text>
          <Form.Select
            value={form.sex}
            onChange={(e) => setField("sex", e.target.value)}
            isInvalid={!!errors.sex}
          >
            <option value="" hidden>
              Select Gender
            </option>
            {Object.entries(genderObject).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.sex}
          </Form.Control.Feedback>
        </InputGroup>

        <InputGroup size="lg" as={Col}>
          <InputGroup.Text>Blood Group</InputGroup.Text>
          <Form.Select
            value={form.blood_grp}
            onChange={(e) => setField("blood_grp", e.target.value)}
            isInvalid={!!errors.blood_grp}
          >
            <option value="" hidden>
              Select Blood Group
            </option>
            {Object.entries(bloodGroupObject).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.blood_grp}
          </Form.Control.Feedback>
        </InputGroup>
      </Row>

      {/* DOB */}
      <Row className="mb-5">
        <InputGroup size="lg" as={Col} style={{ maxWidth: "50%" }}>
          <InputGroup.Text>Date Of Birth</InputGroup.Text>
          <Form.Control
            type="date"
            placeholder="dd/mm/yyyy"
            value={form.dob}
            onChange={(e) => setField("dob", e.target.value)}
            isInvalid={!!errors.dob}
          />
          <Form.Control.Feedback type="invalid">
            {errors.dob}
          </Form.Control.Feedback>
        </InputGroup>
      </Row>

      {/* --------------------------------------------------------------------- */}
      {/* Address Input */}
      {/* --------------------------------------------------------------------- */}
      <Row className="mb-5">
        <InputGroup size="lg">
          <InputGroup.Text>Address</InputGroup.Text>
          <Form.Control
            as="textarea"
            placeholder="Flat no., Street name, City..."
            value={form.address}
            onChange={(e) => setField("address", e.target.value)}
            isInvalid={!!errors.address}
          />
          <Form.Control.Feedback type="invalid">
            {errors.address}
          </Form.Control.Feedback>
        </InputGroup>
      </Row>

      {/* --------------------------------------------------------------------- */}
      {/* --------------------------------------------------------------------- */}
      {/* Contact Details => Email and Phone Number*/}
      {/* --------------------------------------------------------------------- */}
      {/* --------------------------------------------------------------------- */}
      <h2 className="form-section">Contact details</h2>
      <Row className="mb-5">
        <InputGroup size="lg" as={Col}>
          <InputGroup.Text>Email</InputGroup.Text>
          <Form.Control
            type="email"
            placeholder="Enter email address"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </InputGroup>

        <InputGroup size="lg" as={Col}>
          <InputGroup.Text>Phone no.</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Enter 10-dig phone no."
            value={form.phone}
            onChange={(e) => setField("phone", e.target.value)}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
        </InputGroup>
      </Row>

      {/* --------------------------------------------------------------------- */}
      {/* --------------------------------------------------------------------- */}
      {/* Donation Center Details */}
      {/* --------------------------------------------------------------------- */}
      {/* --------------------------------------------------------------------- */}
      <h2 className="form-section">Center Details</h2>
      <Row className="mb-5">
        <InputGroup size="lg" as={Col}>
          <InputGroup.Text>Center Id</InputGroup.Text>
          <Form.Select
            value={form.center_id}
            onChange={(e) => setField("center_id", e.target.value)}
            isInvalid={!!errors.center_id}
          >
            <option value="" hidden>
              Select Center Id
            </option>

            {centersData.map((center) => {
              return (
                <option key={center.center_id} value={center.center_id}>
                  {center.center_id + " : " + center.center_name}
                </option>
              );
            })}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.center_id}
          </Form.Control.Feedback>
        </InputGroup>
      </Row>

      {/* Date of Donation, Time of Donation */}
      <Row className="mb-4">
        <InputGroup size="lg" as={Col} style={{ maxWidth: "50%" }}>
          <InputGroup.Text>Date Of Donation</InputGroup.Text>
          <Form.Control
            type="date"
            placeholder="dd/mm/yyyy"
            value={form.app_date}
            onChange={(e) => setField("app_date", e.target.value)}
            isInvalid={!!errors.app_date}
          />
          <Form.Control.Feedback type="invalid">
            {errors.app_date}
          </Form.Control.Feedback>
        </InputGroup>

        <InputGroup size="lg" as={Col}>
          <InputGroup.Text>Time Of Donation</InputGroup.Text>
          <TimePicker
            start="09:00"
            end="17:30"
            step={30}
            value={form.app_time}
            onChange={handleTimeChange}
            isInvalid={!!errors.app_time}
          />
          <Form.Control.Feedback type="invalid">
            {errors.app_time}
          </Form.Control.Feedback>
        </InputGroup>
      </Row>

      {/* --------------------------------------------------------------------- */}
      {/* --------------------------------------------------------------------- */}
      {/* Terms and Condition Checkbox */}
      {/* --------------------------------------------------------------------- */}
      {/* --------------------------------------------------------------------- */}
      <Form.Group className="mb-3 terms-checkbox">
        <Form.Check
          size="lg"
          label="Agree to terms and conditions"
          onChange={(e) => setTnc(!Tnc)}
        />
      </Form.Group>

      <button
        type="submit"
        onClick={handleSubmit}
        className={isSubmitted ? "form-submitted-button" : "form-submit-button"}
        disabled={isLoading || isSubmitted}
      >
        {isLoading && <MySpinner />}
        {isSubmitted ? "Submitted" : "Register"}
      </button>

      <pre className="fs-3 fw-bold mt-4 mb-0">
        {isSubmitted ? `Your application id is : ${response.data.app_id}` : ""}
      </pre>
    </Form>
  );
};

export default RegistrationForm;
