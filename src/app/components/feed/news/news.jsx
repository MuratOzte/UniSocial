const NewsSection = () => {
    const news = [
        { title: "Ten questions you should answer truthfully", time: "2hr" },
        { title: "Five unbelievable facts about money", time: "3hr" },
        { title: "Best Pinterest Boards for learning about business", time: "4hr" },
        { title: "Skills that you can learn from business", time: "6hr" },
    ];

    return (
        <div className="w-full max-w-sm bg-gray-800 text-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Today's news</h2>
            <ul>
                {news.map((item, index) => (
                    <li key={index} className="mb-3">
                        <a
                            href="#"
                            className="text-sm font-medium text-gray-300 hover:text-white"
                        >
                            {item.title}
                        </a>
                        <p className="text-xs text-gray-500">{item.time}</p>
                    </li>
                ))}
            </ul>
            <div className="mt-4">
                <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-white flex items-center"
                >
                    <span className="mr-1">... </span> View all latest news
                </a>
            </div>
        </div>
    );
};

export default NewsSection;
