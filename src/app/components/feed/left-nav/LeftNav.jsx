import { Divider } from '@mui/material';
import Image from 'next/image';
import ImageSection from './ImageSection';
import About from './About';
import Numbers from './Numbers';

const LeftNav = () => {
    return (
        <div className="w-[350px] rounded-md mt-6 ml-4">
            <ImageSection />
            <About />
            <Numbers follower={123} followings={456} post={789} />
        </div>
    );
};

export default LeftNav;
