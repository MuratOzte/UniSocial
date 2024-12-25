'use client';
import gif from '@/assets/loadingSpinnerGif.gif';
import Image from 'next/image';
import ProfileAboutView from '../components/Profile/ProfileAbout';
const Main = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex justify-center items-center text-gray-200 text-7xl">
                <span>Uni</span>
                <Image src={gif} width={120} height={120} alt="gif" />
                <span>ocial</span>
            </div>
            <ProfileAboutView />
        </div>
    );
};

export default Main;
