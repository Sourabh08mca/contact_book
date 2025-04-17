import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const tagsList = ["Work", "Family", "Urgent", "Friends"];

function AddContact() {
  const [contacts, setContacts] = useState([]);
  const [filterTag, setFilterTag] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const handleTagChange = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      name,
      phone,
      email,
      tags: selectedTags,
      filterTag: selectedTags,
      id: editId !== null ? editId : Date.now(),
    };

    axios
      .post("http://localhost:3001/createContact", newContact)
      .then((res) => {
        console.log("Saved to backend:", res.data);
        alert("Contact added successfully.");
        navigate("/");
      })
      .catch((err) => console.error(err));

    if (editId !== null) {
      setContacts((prev) =>
        prev.map((c) => (c.id === editId ? newContact : c))
      );
    } else {
      setContacts((prev) => [...prev, newContact]);
    }

    // Reset form
    setName("");
    setPhone("");
    setEmail("");
    setSelectedTags([]);
    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center text-white">
          Contact Manager
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-700 p-6 rounded-xl shadow-inner"
        >
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="flex flex-wrap gap-3">
            {tagsList.map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() => handleTagChange(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium border ${
                  selectedTags.includes(tag)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-600 text-gray-200 hover:bg-gray-500"
                } transition`}
              >
                {tag}
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg text-lg font-semibold transition"
          >
            {editId !== null ? "Update Contact" : "Add Contact"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddContact;
