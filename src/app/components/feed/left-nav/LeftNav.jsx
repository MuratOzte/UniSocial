import About from './About';
import Buttons from './Buttons';
import ImageSection from './ImageSection';
import Numbers from './Numbers';

const LeftNav = () => {
    return (
        <div className="w-[350px] rounded-md mt-6 ml-4">
            <ImageSection />
            <About
                department={'Bilgisayar Mühendisliği'}
                name={'Murat Öztürk'}
                university={'Karadeniz Teknik Üniversitesi'}
            />
            <Numbers follower={123} followings={456} post={789} />
            <Buttons />
        </div>
    );
};

export default LeftNav;
