const AnnounceCard = ({ title, time, index, author }) => {
  const news = [
    { title: "Ten questions you should answer truthfully", time: "2hr" },
    { title: "Five unbelievable facts about money", time: "3hr" },
    { title: "Best Pinterest Boards for learning about business", time: "4hr" },
    { title: "Skills that you can learn from business", time: "6hr" },
  ];

  return (
    <div className="w-full max-w-sm bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      <ul>
        <li key={index} className="mb-3">
          <p
            className="text-md font-medium text-gray-300"
          >
            {title}
          </p>
          <div className="flex justify-between items-center text-md text-gray-500">
            <p className="text-xs text-gray-500">{time}</p>
            <p>{author}</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AnnounceCard;
