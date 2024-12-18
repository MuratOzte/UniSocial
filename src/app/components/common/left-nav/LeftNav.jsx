import About from './About';
import Buttons from './Buttons';
import ImageSection from './ImageSection';
import Numbers from './Numbers';

const LeftNav = () => {

    //emre burda http://localhost:3000/api/get-left-bar-info adresine token ile birlikte get request at kanka
    //dönen response'u burda kullan
    //böyle bir response dner

    // {
    //     "message": "User data retrieved successfully",
    //     "userData": {
    //       "name": "admin",
    //       "surname": "admin",
    //       "univercity": "admin",
    //       "department": "admin",
    //       "totalPosts": 2,
    //       "totalFollowers": 0,
    //       "totalFollowing": 0
    //     }
    //   }

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
