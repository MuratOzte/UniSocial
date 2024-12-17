"use client";
import feedSlice, { fetchPosts } from "@/store/Slices/FeedSlice";
import { sharePostRequest } from "@/util/feedService";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TbSend } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../common/Loading";
import FileUploadModal from "./FileUploadModal";
import ShareFooter from "./ShareFooter";
import { MdEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";

const Share = () => {
  const dispatch = useDispatch();
  const [isEmojiOpened, setIsEmojiOpened] = useState(false);
  const feed = useSelector((state) => state.feed);
  const [token, setToken] = useState(null);
  const [file, setFile] = useState(null);
  const [base64File, setBase64File] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const emojiPickerRef = useRef(null); // Referans ekliyoruz

  const EmojiModuleOpenHandler = () => {
    setIsEmojiOpened((prev) => !prev);
  };
  const inputValChangeHandler = (e) => {
    dispatch(
      feedSlice.actions.shareMessageChangeHandler(e.currentTarget.value)
    );
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const sharePostHandler = async () => {
    setIsLoading(true);
    const data = await sharePostRequest(token, feed.shareMessage, base64File);
    setIsLoading(false);
    dispatch(fetchPosts(localStorage.getItem("token")));
    console.log(data);
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      sharePostHandler();
    }
  };

  const uploadFileModalHandler = () => {
    dispatch(feedSlice.actions.setIsFileUploadModalOpen(true));
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64File(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setBase64File(null);
    }
  }, [file]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setIsEmojiOpened(false);
      }
    };

    if (isEmojiOpened) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isEmojiOpened]);

  const EmojiClicked = (e) => {
    const newMessage = feed.shareMessage + e.emoji;
    dispatch(feedSlice.actions.shareMessageChangeHandler(newMessage));
  };
  return (
    <div className="w-full max-w-md p-4 h-fit rounded-lg shadow-lg bg-gray-800 text-white mt-4">
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-80 flex items-center justify-center z-50">
          <Loading />
        </div>
      )}
      <div className="flex items-center mb-4 relative">
        <Image
          src={
            "https://media-ist1-1.cdn.whatsapp.net/v/t61.24694-24/397884028_1042568196864685_3091923269807243330_n.jpg?ccb=11-4&oh=01_Q5AaIKQmUOCzd8T27xRaE1xk6hv1larJdXmoCzMxBD7ZMq3A&oe=67557ECD&_nc_sid=5e03e0&_nc_cat=101"
          }
          alt="avatar"
          width={50}
          height={50}
          className="rounded-full mr-4"
        />
        <div style={{ position: "relative" }} ref={emojiPickerRef}>
          <MdEmojiEmotions
            style={{
              position: "absolute",
              right: 10,
              top: 10,
              cursor: "pointer",
            }}
            size={20}
            onClick={EmojiModuleOpenHandler}
          />
          <EmojiPicker
            style={{
              position: "absolute",
              top: "50px",
              left: "75px",
              zIndex: 10,
            }}
            open={isEmojiOpened}
            onEmojiClick={EmojiClicked}
          />
          <input
            value={feed.shareMessage}
            type="text"
            onKeyDown={keyPressHandler}
            onChange={inputValChangeHandler}
            placeholder="Share your thoughts..."
            className="flex-1 bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <TbSend
          className="ml-2 cursor-pointer"
          onClick={sharePostHandler}
          size={24}
        />
      </div>
      <FileUploadModal file={file} setFile={setFile} />

      <ShareFooter uploadFileModalHandler={uploadFileModalHandler} />
    </div>
  );
};

export default Share;
