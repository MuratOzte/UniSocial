'use client';
import slogo from '@/assets/logo/slogo.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Main = () => {
    const [isTriggered, setIsTriggered] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsTriggered(true), 300); // Delay the trigger for a smoother effect
    }, []);

    return (
        <div className="flex items-center justify-center bg-fff">
            <span
                className={`text-transparent justify-end flex bg-clip-text bg-gradient-to-r from-purple-500 via-pink-600 to-red-500 origin-left overflow-hidden transition-all duration-[3000ms] ease-in-out ${
                    isTriggered ? 'w-[150px]' : 'w-0'
                } text-6xl`} 
                style={{ whiteSpace: 'nowrap' }}
            >
                Uni
            </span>

            <Image src={slogo} alt="s" className="h-20 w-16 mx-2" />

            <span
                className={`text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-600 to-red-500 origin-left inline-block overflow-hidden transition-all duration-[3000ms] ease-in-out ${
                    isTriggered ? 'w-[150px]' : 'w-0'
                } text-6xl`} 
                style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
            >
                ocial
            </span>
        </div>
    );
};

export default Main;
