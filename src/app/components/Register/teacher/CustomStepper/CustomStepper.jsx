'use client';

import { FiLogIn } from 'react-icons/fi';
import { MdAccountCircle } from 'react-icons/md';
import { MdSchool } from 'react-icons/md';
import IconCircle from './IconCircle';

const CustomStepper = () => {
    return (
        <div className="flex gap-8 justify-center">
            <IconCircle
                title={'Öğrenci Bilgileri'}
                icon={<MdAccountCircle size={24} color='white' />}
                active={true}
                isLast
            />
            <IconCircle
                title={'Üniversite Bilgileri'}
                icon={<MdSchool size={24} color='white' />}
                active={true}
            />
            <IconCircle
                title={'Giriş Bilgileri'}
                icon={<FiLogIn size={24} color='white' />}
                active={false}
            />
        </div>
    );
};

export default CustomStepper;
