import ImageSection from './ImageSection';
import About from './About';
import Numbers from './Numbers';
import Buttons from './Buttons';
import useLeftNav from '@/hooks/useLeftNav';

const LeftNav = () => {
    const { uidata, error, isLoading } = useLeftNav();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
        
    }


    return (
        <div className="w-[350px] rounded-md mt-6 ml-4">
            {uidata && (
                <>
                    <ImageSection  image={uidata.profilePicture} />
                    <About
                        department={uidata.department}
                        name={`${uidata.name} ${uidata.surname}`}
                        university={uidata.univercity}
                    />
                    <Numbers
                        follower={uidata.totalFollowers}
                        followings={uidata.totalFollowing}
                        post={uidata.totalPosts}
                    />
                    <Buttons />
                </>
            )}
        </div>
    );
};

export default LeftNav;
