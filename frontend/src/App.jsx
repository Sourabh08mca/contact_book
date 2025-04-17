import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Contact from "./component/Contact";
import AddContact from "./component/AddContact";
import UpdateContact from "./component/UpdateContact";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-700 to-purple-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-wide drop-shadow-sm">
            📇 Contact Books
          </h1>
          <div className="space-x-4 flex items-center">
            <Link
              to="/"
              className="text-white font-medium hover:bg-white hover:text-blue-700 transition px-4 py-2 rounded-lg"
            >
              View Contacts
            </Link>
            <Link
              to="/add"
              className="text-white font-medium hover:bg-white hover:text-purple-700 transition px-4 py-2 rounded-lg"
            >
              Add Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <div className="p-6 bg-gray-900 min-h-screen text-white">
        <Routes>
          <Route path="/" element={<Contact />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/update/:id" element={<UpdateContact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
