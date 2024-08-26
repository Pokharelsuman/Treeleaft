// src/components/Form.jsx
import React, { useState, useEffect } from "react";
import { fetchCountries } from "../api";

const Form = ({ addOrUpdateEntry, editing, currentData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState({
    city: "",
    district: "",
    province: 1,
    country: "Nepal",
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getCountries = async () => {
      const countries = await fetchCountries();
      setCountries(countries);
    };
    getCountries();
  }, []);

  useEffect(() => {
    if (editing) {
      setName(currentData.name);
      setEmail(currentData.email);
      setPhoneNumber(currentData.phoneNumber);
      setDob(currentData.dob);
      setAddress(currentData.address);
      setProfilePicture(currentData.profilePicture);
    }
  }, [editing, currentData]);

  const validateForm = () => {
    let valid = true;
    let errors = {};
    if (!name) {
      errors.name = "Name is required";
      valid = false;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is required and should be in the correct format";
      valid = false;
    }
    if (!phoneNumber || !/^\d{7,}$/.test(phoneNumber)) {
      errors.phoneNumber =
        "Phone number is required and should be at least 7 digits long";
      valid = false;
    }
    if (profilePicture && !profilePicture.name.endsWith(".png")) {
      errors.profilePicture = "Profile picture must be a PNG file";
      valid = false;
    }
    setErrors(errors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = {
        name,
        email,
        phoneNumber,
        dob,
        address,
        profilePicture: profilePicture
          ? URL.createObjectURL(profilePicture)
          : "",
      };
      addOrUpdateEntry(formData);
      resetForm();
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setDob("");
    setAddress({ city: "", district: "", province: 1, country: "Nepal" });
    setProfilePicture(null);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>Phone Number</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
      </div>
      <div>
        <label>DOB</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </div>
      <div>
        <label>City</label>
        <input
          type="text"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
        />
      </div>
      <div>
        <label>District</label>
        <input
          type="text"
          value={address.district}
          onChange={(e) => setAddress({ ...address, district: e.target.value })}
        />
      </div>
      <div>
        <label>Province</label>
        <select
          value={address.province}
          onChange={(e) =>
            setAddress({ ...address, province: Number(e.target.value) })
          }
        >
          {[...Array(7).keys()].map((num) => (
            <option key={num} value={num + 1}>
              Province {num + 1}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Country</label>
        <select
          value={address.country}
          onChange={(e) => setAddress({ ...address, country: e.target.value })}
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Profile Picture</label>
        <input
          type="file"
          accept=".png"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
        {errors.profilePicture && <span>{errors.profilePicture}</span>}
      </div>
      <button type="submit">{editing ? "Update" : "Add"} Entry</button>
    </form>
  );
};

export default Form;
