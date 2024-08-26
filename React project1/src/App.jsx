// // src/App.jsx
// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Form from "./components/Form";
// import Table from "./components/Table";
// import ProfilePage from "./components/ProfilePage";

// const App = () => {
//   const [entries, setEntries] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editingData, setEditingData] = useState(null);

//   useEffect(() => {
//     const savedEntries = JSON.parse(localStorage.getItem("entries")) || [];
//     setEntries(savedEntries);
//   }, []);

//   const addOrUpdateEntry = (entry) => {
//     let updatedEntries = [...entries];
//     if (editingIndex !== null) {
//       updatedEntries[editingIndex] = entry;
//     } else {
//       updatedEntries.push(entry);
//     }
//     setEntries(updatedEntries);
//     localStorage.setItem("entries", JSON.stringify(updatedEntries));
//     setEditingIndex(null);
//     setEditingData(null);
//   };

//   const deleteEntry = (index) => {
//     const updatedEntries = entries.filter((_, i) => i !== index);
//     setEntries(updatedEntries);
//     localStorage.setItem("entries", JSON.stringify(updatedEntries));
//   };

//   const editEntry = (index) => {
//     setEditingIndex(index);
//     setEditingData(entries[index]);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <div>
//               <Form
//                 addOrUpdateEntry={addOrUpdateEntry}
//                 editing={editingIndex !== null}
//                 currentData={editingData}
//               />
//               <Table
//                 entries={entries}
//                 deleteEntry={deleteEntry}
//                 editEntry={editEntry}
//               />
//             </div>
//           }
//         />
//         <Route path="/profiles" element={<ProfilePage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Form from './components/Form';
import Table from './components/Table';
import ProfilePage from './components/ProfilePage';
import "./styles.css";


const App = () => {
  const [entries, setEntries] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState(null);

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    setEntries(savedEntries);
  }, []);

  const addOrUpdateEntry = (entry) => {
    let updatedEntries = [...entries];
    if (editingIndex !== null) {
      updatedEntries[editingIndex] = entry;
    } else {
      updatedEntries.push(entry);
    }
    setEntries(updatedEntries);
    localStorage.setItem('entries', JSON.stringify(updatedEntries));
    setEditingIndex(null);
    setEditingData(null);
  };

  const deleteEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    localStorage.setItem('entries', JSON.stringify(updatedEntries));
  };

  const editEntry = (index) => {
    setEditingIndex(index);
    setEditingData(entries[index]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div>
            <Form addOrUpdateEntry={addOrUpdateEntry} editing={editingIndex !== null} currentData={editingData} />
            <Table entries={entries} deleteEntry={deleteEntry} editEntry={editEntry} />
          </div>
        } />
        <Route path="/profiles" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
