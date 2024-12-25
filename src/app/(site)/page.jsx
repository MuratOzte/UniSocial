'use client';
import gif from '@/assets/loadingSpinnerGif.gif';
import Image from 'next/image';
const Main = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex justify-center items-center text-gray-200 text-7xl">
                <span>Uni</span>
                <Image src={gif} width={120} height={120} alt="gif" />
                <span>ocial</span>
            </div>
        </div>
    );
};

export default Main;
