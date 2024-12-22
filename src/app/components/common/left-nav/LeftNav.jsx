import ImageSection from './ImageSection';
import About from './About';
import Numbers from './Numbers';
import Buttons from './Buttons';
import useLeftNav from '@/hooks/useLeftNav';

const LeftNav = () => {
    const { uidata, error, isLoading } = useLeftNav();
    console.log(uidata);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
        
    }

    //emre burada uidatanın içindeki resme göre resim döndürmen gerekiyor imagesectiona prop olarak gönder resim null ise icon döndür

    return (
        <div className="w-[350px] rounded-md mt-6 ml-4">
            {uidata && (
                <>
                    <ImageSection />
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
