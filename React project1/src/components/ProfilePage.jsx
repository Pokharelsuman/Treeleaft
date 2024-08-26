// src/components/ProfilePage.jsx
import React from "react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const entries = JSON.parse(localStorage.getItem("entries")) || [];

  return (
    <div>
      <h1>Profiles</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>DOB</th>
            <th>Address</th>
            <th>Profile Picture</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.name}</td>
              <td>{entry.email}</td>
              <td>{entry.phoneNumber}</td>
              <td>{entry.dob}</td>
              <td>{`${entry.address.city}, ${entry.address.district}, Province ${entry.address.province}, ${entry.address.country}`}</td>
              <td>
                {entry.profilePicture && (
                  <img src={entry.profilePicture} alt="Profile" width={50} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/">Go back</Link>
    </div>
  );
};

export default ProfilePage;
