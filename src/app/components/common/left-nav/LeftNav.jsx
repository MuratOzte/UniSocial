import { useEffect } from "react";
import About from "./About";
import Buttons from "./Buttons";
import ImageSection from "./ImageSection";
import Numbers from "./Numbers";

const LeftNav = () => {
  //emre burda http://localhost:3000/api/get-left-bar-info adresine token ile birlikte get request at kanka
  //dönen response'u burda kullan
  //böyle bir response döner profile picture null ise react iconsdan account gibi bir icon koyabilirsin

  // {
  //     "message": "User data retrieved successfully",
  //     "userData": {
  //       "profilePicture": null,
  //       "name": "admin",
  //       "surname": "admin",
  //       "univercity": "admin",
  //       "department": "admin",
  //       "totalPosts": 4,
  //       "totalFollowers": 0,
  //       "totalFollowing": 0
  //     }
  //   }

  useEffect(() => {
    const LeftNavSendRequest = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/api/get-left-bar-info",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
    };

    try {
      LeftNavSendRequest();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="w-[350px] rounded-md mt-6 ml-4">
      <ImageSection />
      <About
        department={"Bilgisayar Mühendisliği"}
        name={"Murat Öztürk"}
        university={"Karadeniz Teknik Üniversitesi"}
      />
      <Numbers follower={123} followings={456} post={789} />
      <Buttons />
    </div>
  );
};

export default LeftNav;
