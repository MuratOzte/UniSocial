const IconCircle = ({ title, icon, active }) => {
    return (
        <div className="relative">
            <div className="flex justify-center flex-col items-center">
                <div className={` p-3 rounded-full ${active ? 'bg-blue-700' : 'bg-gray-300'}`}>{icon}</div>
                <p>{title}</p>
            </div>
            <div className="absolute w-20 h-1 bg-black top-[16px] left-[80px]"></div>
        </div>
    );
};

export default IconCircle;
