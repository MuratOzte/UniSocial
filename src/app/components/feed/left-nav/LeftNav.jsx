import { Divider } from '@mui/material';
import Image from 'next/image';

const LeftNav = () => {
    return (
        <div className="w-[350px] rounded-md mt-6 ml-4">
            <div className="relative">
                <div
                    className="w-full h-24 bg-red-400 flex justify-center items-center rounded-md"
                    style={{
                        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWZTMfmAyaIB2bHVTsZStAX9UptLRYymfYORAMWRAZCp5zoPcuN9phwDM6xeKFeWns90w&usqp=CAU')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <Image
                        src={
                            'https://media-ist1-1.cdn.whatsapp.net/v/t61.24694-24/397884028_1042568196864685_3091923269807243330_n.jpg?ccb=11-4&oh=01_Q5AaIKQmUOCzd8T27xRaE1xk6hv1larJdXmoCzMxBD7ZMq3A&oe=67557ECD&_nc_sid=5e03e0&_nc_cat=101'
                        }
                        width={100}
                        height={100}
                        className="rounded-full border-2 border-white absolute -bottom-7"
                    />
                </div>
            </div>
            <div className="flex justify-center items-center flex-col pt-8 w-full bg-blue-200">
                <p className="text-2xl font-semibold text-gray-800">
                    Murat Öztürk
                </p>
                <p className="text-base text-gray-600">
                    Karadeniz Teknik Üniversitesi
                </p>
                <p className="text-sm text-gray-500">Bilgisayar Mühendisliği</p>
            </div>
            <div className="bg-blue-200 flex items-center justify-center py-3">
                <div className="bg-blue-100 w-fit px-4 rounded-md border-2 border-blue-300 shadow-lg text-center py-1">
                    <p className="font-bold">256</p>
                    <p>Post</p>
                </div>
                <div className="w-[1px] h-10 bg-blue-400 mx-3" />
                <div className="bg-blue-100 w-fit px-4 rounded-md border-2 border-blue-300 shadow-lg text-center py-1">
                    <p className="font-bold">123</p>
                    <p>Follower</p>
                </div>
                <div className="w-[1px] h-10 bg-blue-400 mx-3" />
                <div className="bg-blue-100 w-fit px-4 rounded-md border-2 border-blue-300 shadow-lg text-center py-1">
                    <p className="font-bold">432</p>
                    <p>Followings</p>
                </div>
            </div>
        </div>
    );
};

export default LeftNav;
