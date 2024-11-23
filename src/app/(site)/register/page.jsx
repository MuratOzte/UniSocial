'use client';
import UniSocialLogo from '@/app/components/Register/common/UniSocialLogo';
import { motion } from 'framer-motion';

const Page = () => {
    return (
        <div className="relative w-full h-screen bg-gray-100 flex justify-center">
            <div className="w-fit h-24 flex items-center justify-center rounded-lg mt-12">
                <UniSocialLogo  />
            </div>
        </div>
    );
};

export default Page;
