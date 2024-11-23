const IconCircle = ({ title, icon, active, isLast = false }) => {
    return (
        <div className="relative">
            {!isLast && (
                <div
                    className={`absolute w-[125px] h-1 bg-black top-[21px] right-[65px] z-0 ${
                        active ? 'bg-registerBlue' : 'bg-registerGray'
                    }`}
                ></div>
            )}
            <div className="relative flex justify-center flex-col items-center z-30">
                <div
                    className={`p-3 rounded-full ${
                        active ? 'bg-registerBlue' : 'bg-registerGray'
                    }`}
                >
                    {icon}
                </div>
                <p>{title}</p>
            </div>
        </div>
    );
};

export default IconCircle;
