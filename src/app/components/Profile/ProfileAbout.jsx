import {
    FaBirthdayCake,
    FaBookOpen,
    FaMale,
    FaMapMarkerAlt,
    FaPhoneAlt,
} from 'react-icons/fa';
import { MdOutgoingMail } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';

const ProfileAbout = () => {
    return (
        <div className="p-6 bg-white shadow-md rounded-lg w-[400px] h-fit mt-12">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-semibold">Hakkımda</h1>
                <div className="flex justify-center items-center gap-1">
                    <MdEdit className="text-gray-400" size={24} />
                    <p className="text-gray-400 cursor-pointer">Düzenle</p>
                </div>
            </div>
            <div className="text-gray-700 space-y-4">
                <h2 className="text-lg font-medium text-gray-900">
                    Ben yazılım yaparım, kitap okurum, film izlerim, erkeklerle
                    gezerim
                </h2>

                <div className="flex items-center text-sm space-x-2">
                    <FaMapMarkerAlt className="text-green-500" />
                    <span className="font-semibold">Yaşadığı Yer:</span>
                    <span>İstanbul</span>
                </div>

                <div className="flex items-center text-sm space-x-2">
                    <FaBirthdayCake className="text-pink-500" />
                    <span className="font-semibold">Doğum Tarihi:</span>
                    <span>12.12.1990</span>
                </div>

                <div className="flex items-center text-sm space-x-2">
                    <FaMale className="text-blue-500" />
                    <span className="font-semibold">Cinsiyet:</span>
                    <span>Erkek</span>
                </div>

                <div className="flex items-center text-sm space-x-2">
                    <FaBookOpen className="text-orange-500" />
                    <span className="font-semibold">Hobiler:</span>
                    <span>Kitap Okumak, Sinema, Seyahat</span>
                </div>

                <div className="flex items-center text-sm space-x-2">
                    <FaPhoneAlt className="text-teal-500" />
                    <span className="font-semibold">Telefon:</span>
                    <span>0123 123 12 12</span>
                </div>

                <div className="flex items-center text-sm space-x-2">
                    <MdOutgoingMail className="text-red-500" />
                    <span className="font-semibold">E-posta:</span>
                    <span>admin@admin</span>
                </div>
            </div>
        </div>
    );
};

export default ProfileAbout;
