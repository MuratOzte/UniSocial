import { IoHomeOutline } from "react-icons/io5";
import { FaMasksTheater } from "react-icons/fa6";
import { MdOutlineEventNote } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Buttons = () => {
  const [IsCommintity, setIsCommintity] = useState(false);

  useEffect(() => {
    const isCommunityValue = localStorage.getItem("isCommunity");
    setIsCommintity(isCommunityValue === "true"); 
  }, []);

  const router = useRouter();

  const buttons = [
    {
      icon: <IoHomeOutline />,
      text: "Home",
      actions: () => {
        router.replace("/feed");
      },
      display: true,
    },
    {
      icon: <FaMasksTheater />,
      text: "Clubs",
      actions: () => {
        router.replace("/clubs");
      },
      display: !IsCommintity, 
    },
    {
      icon: <MdOutlineEventNote />,
      text: "Events",
      actions: () => {
        router.replace("/events");
      },
      display: true,
    },
  ];

  return (
    <div className="flex flex-col bg-main1 pt-4 pb-2 rounded-bl-md rounded-br-md">
      <div className="w-[300px] h-[1px] bg-gray-400 my-3 mt-0 mx-6" />
      {buttons.map(
        (button, index) =>
          button.display && (
            <div
              key={index}
              className="relative flex items-center justify-start w-[350px] h-12 p-4 bg-main1 text-gray-700 cursor-pointer group hover:text-white px-6"
              onClick={button.actions}
            >
              <div className="text-xl mr-4 z-50">{button.icon}</div>
              <p className="text-lg font-medium z-50 leading-tight px-2">
                {button.text}
              </p>
              <div className="absolute left-0 bottom-0 w-0 h-12 bg-blue-500 transition-all group-hover:w-full"></div>
            </div>
          )
      )}
    </div>
  );
};

export default Buttons;
