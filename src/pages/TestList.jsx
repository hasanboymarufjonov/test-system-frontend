import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BASE_URL from "../utils/config";

const TestList = () => {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/tests/subjects`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch subjects");
        }
        const data = await response.json();
        setSubjects(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching subjects:", error.message);
      }
    };

    fetchSubjects();
  }, []);
  return (
    <div className="px-4 bg-slate-900 min-h-screen w-full">
      <h2 className="text-5xl mb-4 text-white text-center pt-5">Subjects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <div
            key={subject._id}
            className="bg-slate-800 shadow-md p-4 border-gray-600 border"
          >
            <img
              src={subject.imageURL}
              alt={subject.name}
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-100">
                {subject.name}
              </h3>
              <div className="flex justify-between">
                <span className="text-gray-300">
                  My Score: {subject.userScore}
                </span>
                <Link
                  to={"tests/" + subject._id}
                  className="text-gray-100 border px-2 hover:bg-gray-700"
                >
                  Start Test
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestList;
