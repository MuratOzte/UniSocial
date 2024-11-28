const Numbers = ({ post, follower, followings }) => {
    return (
        <div className="bg-blue-200 flex items-center justify-center py-3">
            <div className="bg-blue-100 w-fit px-4 rounded-md border-2 border-blue-300 shadow-lg text-center py-1">
                <p className="font-bold">{post}</p>
                <p className="text-sm">Post</p>
            </div>
            <div className="w-[1px] h-10 bg-blue-400 mx-3" />
            <div className="bg-blue-100 w-fit px-4 rounded-md border-2 border-blue-300 shadow-lg text-center py-1">
                <p className="font-bold">{follower}</p>
                <p className="text-sm">Follower</p>
            </div>
            <div className="w-[1px] h-10 bg-blue-400 mx-3" />
            <div className="bg-blue-100 w-fit px-3 rounded-md border-2 border-blue-300 shadow-lg text-center py-1">
                <p className="font-bold">{followings}</p>
                <p className="text-sm">Followings</p>
            </div>
        </div>
    );
};

export default Numbers;
