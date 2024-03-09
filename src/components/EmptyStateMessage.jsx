const EmptyStateMessage = ({ message }) => {
  return (
    <div className=" flex flex-col items-center justify-center text-gray-200">
      <img
        src="https://img.icons8.com/ultraviolet/200/inbox.png"
        alt="Empty box"
        className="w-20 h-20"
      />
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default EmptyStateMessage;
