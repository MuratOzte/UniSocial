'use client';
import gif from '@/assets/loadingSpinnerGif.gif';
import logo from '@/assets/logo/logo.png';
import Image from 'next/image';

const Main = () => {
    return (
        <div className="flex justify-center items-center h-screen w-full bg-main1">
            <div className="flex justify-center items-center">
                {/* Logo için sadece sol tarafını gösterme */}
                <div className="relative w-[400px] h-[120px] overflow-hidden">
                    <Image
                        src={logo}
                        alt="logo"
                        fill // `layout="fill"` yerine `fill` kullanımı
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'left center',
                        }} // Tailwind yerine inline CSS
                    />
                    <div className="absolute bg-red-500 w-[250px] h-32 right-[15px]" />
                    <Image src={gif} width={120} height={120} alt="gif" className='absolute right-[160px] z-40' />
                </div>

                {/* Spinner Gif */}
            </div>
        </div>
    );
};

export default Main;
