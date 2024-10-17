'use client';

import CustomStepper from '@/app/components/Register/CustomStepper/CustomStepper';
import Inputs1 from '@/app/components/Register/Pages/page1';
import Inputs2 from '@/app/components/Register/Pages/page2';

const Register = () => {
    return (
        <div className="">
            <CustomStepper />
            <Inputs1 />
            <Inputs2 />
        </div>
    );
};

export default Register;
