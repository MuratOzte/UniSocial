const About = ({ name, university, department }) => {
    return (
        <div className="flex justify-center items-center flex-col pt-8 w-full bg-main1 ">
            <p className="text-2xl font-semibold text-gray-700">{name}</p>
            <p className="text-base text-gray-500">{university}</p>
            <p className="text-sm text-gray-500">{department}</p>
        </div>
    );
};

export default About;