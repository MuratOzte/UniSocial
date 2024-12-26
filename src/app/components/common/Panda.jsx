'use client';
import Pandaimg from '@/assets/panda.jpeg';
import Image from 'next/image';
const Panda = () => {
    return (
        <div className='flex w-fit px-4 rounded-md bg-fff items-center mt-12 shadow-md' >
            <Image src={Pandaimg} alt="Panda" width={200} height={200} />
            <div className='text-center' >
                <p className='text-2xl text-gray-900' >No Post Found</p>
                <p className='text-lg text-gray-700' >You can share the first post</p>
            </div>
        </div>
    );
};

export default Panda;
