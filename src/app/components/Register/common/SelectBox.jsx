import Image from 'next/image';
import Link from 'next/link';

const SelectBox = () => {
    //todo mert
    /*
        https://designer.microsoft.com/image-creator
        sitesinden öğrenci öğretmen ve şirket için resimler oluşturulacak
        ve bu resimler src/assets/auth klasörüne atılacak
        daha sonrasında aşağıdaki options arrayine eklenerek
        sayfada görüntülenecek

        description kısmını chatgpt yazdı duruma göre onları da değiştirebilirsin
        
        31.satırda
        örnek:
        image: require('@/assets/auth/student.jpeg'),
        
        test etmek için terminale sırayla
        cd .\UniSocial\
        npm run dev yazdıktan sonra
        http://localhost:3000/register
        adresine giderek sayfayı görebilirsin
    */

    const options = [
        {
            id: 'student',
            title: 'Öğrenci',
            description: 'Öğrencilerin kayıtlarının olacağı yer.',
            image: require('@/assets/auth/student.jpeg'),
        },
        {
            id: 'teacher',
            title: 'Öğretmen',
            description: 'Öğretmenlerin kayıtlarının olacağı yer.',
            image: require('@/assets/auth/teacher.jpeg'),
        },
        {
            id: 'community',
            title: 'Topluluk',
            description: 'Toplulukların kayıtlarının olacağı yer.',
            image: require('@/assets/auth/community.jpeg'),
        },
    ];

    return (
        <div className="flex flex-wrap justify-center gap-8 w-full mt-10">
            {options.map(({ id, title, description, image }) => (
                <Link key={id} href={`/register/${id}`} passHref>
                    <div className="relative w-[360px] h-[420px] rounded-lg overflow-hidden shadow-lg group hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <Image
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white p-4">
                            <h3 className="text-2xl font-bold mb-2">{title}</h3>
                            <p className="text-sm opacity-80">{description}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default SelectBox;
