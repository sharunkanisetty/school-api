import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddSchool from './components/AddSchool';
import ListSchools from './components/ListSchools';

const Home = () => (
  <div style={{ textAlign: 'center' }}>
    <h1>Welcome to School Management</h1>
    <nav style={{ marginTop: '20px' }}>
      <Link to="/addSchool" style={{ marginRight: '20px' }}>Add School</Link>
      <Link to="/listSchools">List Schools</Link>
    </nav>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addSchool" element={<AddSchool />} />
        <Route path="/listSchools" element={<ListSchools />} />
      </Routes>
    </Router>
  );
}

export default App;
