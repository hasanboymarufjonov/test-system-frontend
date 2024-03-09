import { useState, useEffect } from "react";
import BASE_URL from "../utils/config";

const AddSubjectModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    imageURL: "",
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddSubject = () => {
    fetch(`${BASE_URL}/api/tests/subjects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New subject added:", data);
        onClose();
      })
      .catch((error) => {
        console.error("Error adding subject:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddSubject();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-slate-800 p-8 rounded-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-xl font-semibold mb-4 text-gray-200">
          Add New Subject
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-gray-200">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 rounded mb-2 bg-slate-900 text-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imageURL" className="block mb-2 text-gray-200">
              Image URL:
            </label>
            <input
              type="text"
              id="imageURL"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 rounded mb-2 bg-slate-900 text-gray-300"
            />
          </div>
          <div className="">
            <button
              type="submit"
              className="bg-blue-900 text-gray-200 px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubjectModal;
