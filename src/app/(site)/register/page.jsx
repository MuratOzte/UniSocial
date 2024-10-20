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

const Register = () => {
    const step = useSelector((state) => state.register.step);

    return (
        <div className="w-full h-screen justify-center flex items-center flex-col relative overflow-hidden">
            <div className="z-0 w-full h-screen absolute bg-[#1f2d3d]">
                <div className="absolute bg-[#4db33d] rounded-full shadow-[0_0_1px_0px_#508fb9] animate-ripple opacity-20 w-[1440px] h-[1440px] -left-[720px] -bottom-[720px]"></div>
                <div className="absolute bg-[#66bb6a] rounded-full shadow-[0_0_1px_0px_#508fb9] animate-ripple opacity-50 w-[1152px] h-[1152px] -left-[576px] -bottom-[576px]"></div>
                <div className="absolute bg-[#81c784] rounded-full shadow-[0_0_1px_0px_#508fb9] animate-ripple opacity-70 w-[864px] h-[864px] -left-[432px] -bottom-[432px]"></div>
                <div className="absolute bg-[#a5d6a7] rounded-full shadow-[0_0_1px_0px_#508fb9] animate-ripple opacity-80 w-[576px] h-[576px] -left-[288px] -bottom-[288px]"></div>
                <div className="absolute bg-[#c8e6c9] rounded-full shadow-[0_0_1px_0px_#508fb9] animate-ripple opacity-90 w-[288px] h-[288px] -left-[144px] -bottom-[144px]"></div>
            </div>
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
