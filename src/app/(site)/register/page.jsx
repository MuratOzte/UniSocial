'use client';

// import CustomStepper from '@/app/components/Register/CustomStepper/CustomStepper';
import CustomStepper from '@/app/components/Register/CustomStepper/newCustomStepper';
import Inputs1 from '@/app/components/Register/Pages/page1';
import Inputs2 from '@/app/components/Register/Pages/page2';
import Inputs3 from '@/app/components/Register/Pages/page3';

import logo from '@/assets/logo/logo.png';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import AuthBackground from '@/app/components/common/authBackground';

const Register = () => {
    const step = useSelector((state) => state.register.step);

    return (
        <div className="w-full h-screen justify-center flex items-center flex-col relative overflow-hidden">
            <AuthBackground />
            <div className="w-5/12 h-[550px] bg-white shadow-xl rounded-xl flex justify-center flex-col items-center my-8 z-50 pb-6 px-4">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '40%' }}
                    transition={{ duration: 0.5 }}
                    className="relative h-[120px] flex justify-center items-center text-center origin-left overflow-hidden"
                >
                    <Image
                        src={logo}
                        alt="logo"
                        layout="fill" // Görseli tam kırpmak için fill kullanıyoruz
                        objectFit="cover" // Görseli kırpmak için
                    />
                </motion.div>
                <CustomStepper />
                {step === 1 && <Inputs1 />}
                {step === 2 && <Inputs2 />}
                {step === 3 && <Inputs3 />}
            </div>
        </div>
    );
};

export default Register;
