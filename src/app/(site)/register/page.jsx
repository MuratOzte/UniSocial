'use client';

// import CustomStepper from '@/app/components/Register/CustomStepper/CustomStepper';
import CustomStepper from '@/app/components/Register/CustomStepper/newCustomStepper';
import Inputs1 from '@/app/components/Register/Pages/page1';
import Inputs2 from '@/app/components/Register/Pages/page2';
import Inputs3 from '@/app/components/Register/Pages/page3';

const Register = () => {
    return (
        <div className="">
            <CustomStepper />
            <Inputs1 />
            <Inputs2 />
            <Inputs3 />
        </div>
    );
};

export default Register;
