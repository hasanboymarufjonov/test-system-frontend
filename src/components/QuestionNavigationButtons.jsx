const QuestionNavigationButtons = ({
  handlePrevQuestion,
  handleNextQuestion,
  currentQuestionIndex,
  totalQuestions,
}) => {
  return (
    <div className="mt-4 justify-end flex">
      {currentQuestionIndex >= 0 && (
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
          className={`mr-2 bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            currentQuestionIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>
      )}
      {currentQuestionIndex < totalQuestions && (
        <button
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === totalQuestions - 1}
          className={`bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            currentQuestionIndex === totalQuestions - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default QuestionNavigationButtons;
