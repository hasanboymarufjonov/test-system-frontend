import { useState } from "react";
import SubjectSelect from "../components/SubjectSelect.jsx";
import AddSubjectModal from "../components/AddSubjectModal.jsx";
import BASE_URL from "../utils/config.js";

const CreateTest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const initialQuestion = {
    text: "",
    answers: [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
  };

  const [testData, setTestData] = useState({
    subject: "",
    questions: [initialQuestion],
  });

  const addQuestion = () => {
    setTestData((prevTestData) => ({
      ...prevTestData,
      questions: [...prevTestData.questions, initialQuestion],
    }));
  };

  const addAnswer = (qIndex) => {
    const updatedTestData = { ...testData };
    updatedTestData.questions[qIndex].answers.push({
      text: "",
      isCorrect: false,
    });
    setTestData(updatedTestData);
  };

  const handleChange = (e, index, field) => {
    const updatedTestData = { ...testData };
    if (field === "subject") {
      updatedTestData.subject = e.target.value;
    } else {
      updatedTestData.questions[index][field] = e.target.value;
    }
    setTestData(updatedTestData);
  };

  const handleAnswerChange = (e, qIndex, aIndex) => {
    const updatedTestData = { ...testData };
    updatedTestData.questions[qIndex].answers[aIndex].text = e.target.value;
    setTestData(updatedTestData);
  };

  const handleCheckboxChange = (qIndex, aIndex) => {
    const updatedTestData = { ...testData };
    updatedTestData.questions[qIndex].answers.forEach(
      (answer, index) => (answer.isCorrect = index === aIndex)
    );
    setTestData(updatedTestData);
  };

  const submitTest = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/tests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      });
      const data = await response.json();
      console.log("Test created successfully:", data);
    } catch (error) {
      console.error("Error creating test:", error);
    }
  };

  return (
    <div className="  bg-slate-900 min-h-screen py-8 px-8 lg:px-96">
      <h1 className="text-3xl font-bold mb-4 text-gray-200">Create New Test</h1>
      <div className="mb-4">
        <label htmlFor="subject" className="block mb-2 text-gray-200">
          Subject:
        </label>
        <SubjectSelect
          value={testData.subject}
          onChange={(e) => handleChange(e, null, "subject")}
        />
        <button
          className="bg-slate-700 text-gray-200 hover:bg-slate-600 rounded w-full py-2 mt-2"
          onClick={openModal}
        >
          Add New Subject
        </button>
        {isModalOpen && <AddSubjectModal onClose={closeModal} />}
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2 text-gray-200">Questions:</h2>
        {testData.questions.map((question, qIndex) => (
          <div key={qIndex} className="mb-4">
            <label
              htmlFor={`question-${qIndex}`}
              className="block mb-2 text-gray-200 "
            >
              Question {qIndex + 1}:
            </label>
            <input
              type="text"
              id={`question-${qIndex}`}
              value={question.text}
              onChange={(e) => handleChange(e, qIndex, "text")}
              className="w-full px-4 py-2 border border-gray-300 rounded mb-2 bg-gray-200"
            />
            {question.answers.map((answer, aIndex) => (
              <div key={aIndex} className="flex items-center mb-2">
                <input
                  type="text"
                  value={answer.text}
                  onChange={(e) => handleAnswerChange(e, qIndex, aIndex)}
                  className="w-full px-4 py-2 border border-gray-300 rounded mr-2 bg-gray-200"
                  placeholder={`Answer ${aIndex + 1}`}
                />
                <input
                  type="checkbox"
                  checked={answer.isCorrect}
                  onChange={() => handleCheckboxChange(qIndex, aIndex)}
                  className="w-12 h-12 bg-gray-200"
                />

                {/* <label className="text-gray-200">Correct Answer</label> */}
              </div>
            ))}
            <button
              onClick={() => addAnswer(qIndex)}
              className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2 w-36"
            >
              Add Answer
            </button>
          </div>
        ))}
        <button
          onClick={addQuestion}
          className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-blue-600 w-36"
        >
          Add Question
        </button>
      </div>
      <button
        onClick={submitTest}
        className="bg-blue-900 text-gray-200 px-4 py-2 rounded hover:bg-blue-800 w-full"
      >
        Submit Test
      </button>
    </div>
  );
};

export default CreateTest;
