import Image from 'next/image';

const ImageSection = ({ background, avatar }) => {
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
                <Image
                    src={
                        'https://media-ist1-1.cdn.whatsapp.net/v/t61.24694-24/397884028_1042568196864685_3091923269807243330_n.jpg?ccb=11-4&oh=01_Q5AaIKQmUOCzd8T27xRaE1xk6hv1larJdXmoCzMxBD7ZMq3A&oe=67557ECD&_nc_sid=5e03e0&_nc_cat=101'
                    }
                    alt='avatar'
                    width={100}
                    height={100}
                    className="rounded-full border-2 border-white absolute -bottom-7"
                />
            </div>
        </div>
    );
};

export default ImageSection;
