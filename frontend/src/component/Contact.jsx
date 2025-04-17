import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const tagsList = ["All", "Work", "Family", "Urgent", "Friends"];

function Contact() {
  const [users, setUsers] = useState([]);
  const [filterTag, setFilterTag] = useState("All");
  const cardRefs = useRef([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:3001", {
          params: {
            filterTag: filterTag === "All" ? "" : filterTag,
          },
        });
        setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchContacts();
  }, [filterTag]);

  const handleDelete = (id) => {
    e.preventDefault();
    axios.delete(`http://localhost:3001/deleteUser/${id}`)
      .then(res => {
        alert("Deleted Successfully...");
        setUsers(prev => prev.filter(user => user._id !== id));
      })
      .catch(err => console.log(err));
  };

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (x - centerX) / 15;

    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (index) => {
    const card = cardRefs.current[index];
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    card.style.transition = 'transform 0.3s ease';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">Contact Directory</h2>

        <div className="mb-6 flex justify-center">
          <label className="text-lg font-medium mr-4">Filter by Tag:</label>
          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {tagsList.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user, index) => (
            <div
              key={user._id}
              ref={(el) => (cardRefs.current[index] = el)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="bg-gray-800 rounded-2xl shadow-lg transition-transform duration-300 p-6 hover:shadow-2xl"
            >
              <div className="mb-4">
                <h3 className="text-2xl font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-400">Contact Information</p>
              </div>

              <div className="space-y-2 text-base text-gray-200">
                <p><span className="font-medium text-gray-400">Phone:</span> {user.phone}</p>
                <p><span className="font-medium text-gray-400">Email:</span> {user.email}</p>
                <p>
                  <span className="font-medium text-gray-400">Tags:</span>{" "}
                  {user.tags && Array.isArray(user.tags)
                    ? user.tags.join(", ")
                    : user.tags}
                </p>
              </div>

              <div className="flex justify-between mt-6">
                <Link
                  to={`/update/${user._id}`}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg shadow-md transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;