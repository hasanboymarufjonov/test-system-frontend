import { useState, useEffect } from "react";
import BASE_URL from "../utils/config";

const SubjectSelect = ({ onChange, value }) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/tests/subjects`, {
          credentials: "include",
        });
        const data = await response.json();
        setSubjects(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <select
      id="subject"
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded"
      disabled={loading}
    >
      <option value="" disabled>
        {loading ? "Loading subjects..." : "Select a subject"}
      </option>
      {subjects.map((subject) => (
        <option key={subject._id} value={subject._id}>
          {subject.name}
        </option>
      ))}
    </select>
  );
};

export default SubjectSelect;
