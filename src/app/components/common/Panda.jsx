'use client';
import Pandaimg from '@/assets/panda.jpeg';
import Image from 'next/image';
const Panda = () => {
    return (
        <div className='flex w-fit px-2 rounded-md bg-gray-400 items-center mt-12 shadow-md' >
            <Image src={Pandaimg} alt="Panda" width={200} height={200} className='mix-blend-color-burn' />
            <div className='text-center' >
                <p className='text-2xl text-gray-900' >No Post Found</p>
                <p className='text-lg text-gray-700' >You can share the first post</p>
            </div>
        </div>
    );
};

export default Panda;
