const SkeletonCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gray-300 h-72 animate-pulse"></div>
      <div className="bg-gray-300 h-72 animate-pulse"></div>
      <div className="bg-gray-300 h-72 animate-pulse"></div>
      <div className="bg-gray-300 h-72 animate-pulse"></div>
      <div className="bg-gray-300 h-72 animate-pulse"></div>
      <div className="bg-gray-300 h-72 animate-pulse"></div>
    </div>
  );
};

export default SkeletonCards;
