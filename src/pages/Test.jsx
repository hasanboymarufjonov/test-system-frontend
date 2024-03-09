import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import TestScoreModal from "../components/TestScoreModal.jsx";
import QuestionNavigationButtons from "../components/QuestionNavigationButtons.jsx";
import BASE_URL from "../utils/config.js";
import EmptyStateMessage from "../components/EmptyStateMessage.jsx";

const Test = () => {
  const [tests, setTests] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(3600);
  const { subjectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/tests/${subjectId}`, {
          credentials: "include",
        });
        const data = await response.json();
        setTests(data);
        setSelectedAnswers(Array(data[0]?.questions.length).fill(""));
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    fetchTests();
  }, [subjectId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    if (timeRemaining === 0) {
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [timeRemaining]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleAnswerChange = (index) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = index;
    setSelectedAnswers(updatedAnswers);
  };

  const currentTest = tests[0];
  const currentQuestion = currentTest?.questions[currentQuestionIndex];
  const submitAnswers = async () => {
    setLoading(true);
    const formattedAnswers = selectedAnswers.map((answer) =>
      answer === "" ? "" : answer
    );
    try {
      const response = await fetch(`${BASE_URL}/api/tests/${subjectId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testId: tests[0].testId,
          answers: selectedAnswers,
        }),
        credentials: "include",
      });
      const data = await response.json();
      console.log("Answers submitted successfully:", data);
      setScore(data.score);
      setShowModal(true);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
    setLoading(false);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="min-h-[calc(100vh-60px)] bg-slate-900 flex items-center justify-center">
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-70  flex items-center justify-center">
          <PuffLoader color={"rgb(37 99 235)"} loading={loading} size={150} />
        </div>
      )}
      <div className="bg-gray-900 p-4 mb-4 w-[1000px]  border border-gray-200">
        {tests.length === 0 ? (
          <EmptyStateMessage message="Tests have not been created yet." />
        ) : (
          <>
            <p className="text-gray-200">Test: {currentTest?.subject.name}</p>
            <p className="text-gray-200">
              Start time: {new Date(currentTest?.time).toLocaleString()}
            </p>
            <p className="text-gray-200">
              Time remaining: {formatTime(timeRemaining)}
            </p>
            <p className="text-gray-200">User: {currentTest?.userName}</p>

            {currentQuestion && (
              <div>
                <h3 className="text-lg font-semibold mt-2 text-gray-200">
                  Question {currentQuestionIndex + 1}:
                </h3>
                <p className="font-semibold text-gray-200">
                  {currentQuestion.text}
                </p>
                <ol className="grid grid-cols-1 md:grid-cols-2">
                  {currentQuestion.answers.map((answer, index) => (
                    <li
                      key={index}
                      className=" flex items-center mt-2 mx-2 bg-gray-800 hover:bg-gray-900 border border-gray-200"
                    >
                      <input
                        type="radio"
                        id={`answer-${index}`}
                        name={`answer`}
                        value={answer.text}
                        className=" h-5 w-1/5  text-indigo-900 focus:ring-indigo-700 py-4"
                        checked={
                          selectedAnswers[currentQuestionIndex] === index
                        }
                        onChange={() => handleAnswerChange(index)}
                      />
                      <label
                        htmlFor={`answer-${index}`}
                        className="text-sm text-gray-200 w-4/5 py-4"
                      >
                        {answer.text}
                      </label>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            <QuestionNavigationButtons
              handlePrevQuestion={handlePrevQuestion}
              handleNextQuestion={handleNextQuestion}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={currentTest?.questions.length}
            />

            <div className="flex justify-center mt-2">
              {currentQuestionIndex === currentTest?.questions.length - 1 && (
                <button
                  onClick={submitAnswers}
                  className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit Answers
                </button>
              )}
            </div>
          </>
        )}
      </div>
      {showModal && <TestScoreModal score={score} onClose={closeModal} />}
    </div>
  );
};

export default Test;
