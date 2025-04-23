import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddSchool from './components/AddSchool';
import ListSchools from './components/ListSchools';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/addSchool" element={<AddSchool />} />
        <Route path="/listSchools" element={<ListSchools />} />
        <Route path="/" element={<h1>Welcome to School Management</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
