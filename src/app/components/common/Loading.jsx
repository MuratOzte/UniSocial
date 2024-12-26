'use client';
import logo from '@/assets/logo/logo.png';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Main = () => {
    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 0.5}}
        className="bg-main1 h-screen w-full relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                <Image
                    src={logo}
                    alt="logo"
                    width={600}
                    height={300}
                    className="object-cover"
                />
                <motion.div
                    initial={{ x: 600 }}
                    animate={{ x: [600, 0, 600] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="bg-main1 w-[600px] h-80 absolute top-10"
                />
            </div>
        </motion.div>
    );
};

export default Main;
