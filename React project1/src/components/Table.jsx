// src/components/Table.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Table = ({ entries, deleteEntry, editEntry }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(entries.length / itemsPerPage);
  const navigate = useNavigate();

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNavigateToProfiles = () => {
    navigate("/profiles");
  };

  const paginatedEntries = entries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>DOB</th>
            <th>Address</th>
            <th>Profile Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEntries.map((entry, index) => (
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
              <td>
                <button onClick={() => editEntry(index)}>Edit</button>
                <button onClick={() => deleteEntry(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <button onClick={handleNavigateToProfiles}>Go to Profiles</button>
    </div>
  );
};

export default Table;
