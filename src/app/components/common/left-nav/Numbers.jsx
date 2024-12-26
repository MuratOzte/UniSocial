const Numbers = ({ post, follower, followings }) => {
    return (
        <div className="bg-main2 flex items-center justify-center py-3">
            <div className="bg-transparent w-fit px-4 rounded-md text-center py-1 text-gray-600">
                <p className="font-bold">{post}</p>
                <p className="text-sm">Post</p>
            </div>
            <div className="w-[1px] h-10 bg-gray-500 mx-3" />
            <div className="bg-transparent w-fit px-4 rounded-md text-center py-1 text-gray-600">
                <p className="font-bold">{follower}</p>
                <p className="text-sm">Follower</p>
            </div>
            <div className="w-[1px] h-10 bg-gray-500 mx-3" />
            <div className="bg-transparent w-fit px-4 rounded-md text-center py-1 text-gray-600">
                <p className="font-bold">{followings}</p>
                <p className="text-sm">Followings</p>
            </div>
        </div>
    );
};

export default Numbers;
