import { AccountCircle } from '@mui/icons-material';
import Image from 'next/image';

const ImageSection = ({ background, avatar, image }) => {
    return (
        <div className="relative">
            <div
                className="w-full h-24 bg-red-400 flex justify-center items-center rounded-tl-md rounded-tr-md"
                style={{
                    backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWZTMfmAyaIB2bHVTsZStAX9UptLRYymfYORAMWRAZCp5zoPcuN9phwDM6xeKFeWns90w&usqp=CAU')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="rounded-full overflow-hidden border-2 border-white absolute -bottom-7 w-[100px] h-[100px] flex justify-center items-center bg-gray-100">
                    {image ? (
                        <Image
                            src={image}
                            alt="avatar"
                            layout="fill"
                            objectFit="cover"
                        />
                    ) : (
                        <AccountCircle
                            className="text-gray-500"
                            style={{ fontSize: '120px' }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageSection;
