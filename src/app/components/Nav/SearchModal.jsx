import { AnimatePresence, motion } from 'framer-motion';
import SearchedUsers from './SearchedUsers';
const SearchModal = () => {
    const DUMMY_SEARCHED_USERS = [
        {
            id: 1,
            name: 'John',
            surname: 'Doe',
            profilePicture: 'https://randomuser.me/api/portraits/women/12.jpg',
        },
        {
            id: 2,
            name: 'Jane',
            surname: 'Doe',
            profilePicture: 'https://randomuser.me/api/portraits/men/12.jpg',
        },
    ];

    //emre burdaki veriler maplenecek    

    return (
        <AnimatePresence mode="popLayout">
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 400 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-14 right-0 z-50 w-96 bg-white shadow-lg rounded-md px-6"
            >
                <SearchedUsers  />
            </motion.div>
        </AnimatePresence>
    );
};

export default SearchModal;
