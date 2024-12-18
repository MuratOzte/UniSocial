const About = ({ name, university, department }) => {
    return (
        <div className="flex justify-center items-center flex-col pt-8 w-full bg-gray-800">
            <p className="text-2xl font-semibold text-gray-200">{name}</p>
            <p className="text-base text-gray-400">{university}</p>
            <p className="text-sm text-gray-400">{department}</p>
        </div>
    );
};

export default About;
