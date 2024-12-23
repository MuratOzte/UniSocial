import { AnimatePresence, motion } from 'framer-motion';
const SearchModal = () => {
    return (
        <AnimatePresence
            mode='popLayout'
        >
            <motion.div
                initial={{ opacity: 0, height: 0  }}
                animate={{ opacity: 1, height: 400 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-14 right-0 z-50 w-96 bg-white shadow-lg rounded-md px-6"
            >
                Search Modal
            </motion.div>
        </AnimatePresence>
    );
};

export default SearchModal;
