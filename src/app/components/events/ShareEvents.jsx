import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import feedSlice from "@/store/Slices/FeedSlice";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import Loading from "../common/Loading";

export default function ShareEvents() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    eventType: "Social",
    price: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleClose = () => {
    dispatch(feedSlice.actions.OpenShareModalChangeHandler(false));
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      eventType: "",
      price: "",
    });
    setFile(null);
    setPreview(null);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleFileDelete = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log("Form Data:", formData);
    console.log("File Data:", file);

    let base64File = null;
    if (file) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        base64File = reader.result;

        const data = {
          ...formData,
          price: parseInt(formData.price),
          image: base64File,
        };

        try {
          const response = await fetch(
            "http://localhost:3000/api/create-event",
            {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          const result = await response.json();
          console.log(result);
        } catch (error) {
          console.error("Error submitting form:", error);
        }

        handleClose();
      };

      reader.readAsDataURL(file);
    } else {
      const data = {
        ...formData,
        price: parseInt(formData.price),
      };

      try {
        const response = await fetch("http://localhost:3000/api/create-event", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      setIsLoading(false);
      handleClose();
    }
  };

  return (
    <div>
      <div
        className={`${
          feed.OpenShareModal ? "block" : "hidden"
        } fixed inset-0 z-50 flex items-center justify-center`}
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleClose}
        ></div>

        <div className="relative z-50 bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Share an Event
          </h2>
          <form className="space-y-4 flex justify-center flex-col items-center">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              className="w-full p-3 rounded-lg focus:outline-none bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 transition duration-200"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="w-full p-3 rounded-lg focus:outline-none bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 transition duration-200"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  date: e.target.value,
                })
              }
              className="w-full p-3 rounded-lg focus:outline-none bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 transition duration-200"
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  time: e.target.value,
                })
              }
              className="w-full p-3 rounded-lg focus:outline-none bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 transition duration-200"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: e.target.value,
                })
              }
              className="w-full p-3 rounded-lg focus:outline-none bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 transition duration-200"
            />
            <select
              name="eventType"
              value={formData.eventType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  eventType: e.target.value,
                })
              }
              className="w-full p-3 rounded-lg focus:outline-none bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 transition duration-200"
            >
              <option value="Social" defaultValue={"Social"}>
                Social
              </option>
              <option value="Academic">Academic</option>
            </select>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: e.target.value,
                })
              }
              className="w-full p-3 rounded-lg focus:outline-none bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 transition duration-200"
            />
            <button
              type="button"
              onClick={() => setIsFileUploadModalOpen(true)}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition w-fit"
            >
              <div className="flex gap-2">
                <MdOutlineFileUpload size={20} />
                Upload File
              </div>
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              {isLoading ? <Loading /> : "Submit"}
            </button>
          </form>
        </div>
      </div>

      <div
        className={`${
          isFileUploadModalOpen ? "block" : "hidden"
        } fixed inset-0 z-50 flex items-center justify-center`}
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsFileUploadModalOpen(false)}
        ></div>

        <div className="relative z-50 bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-xl font-bold mb-4">Upload a File</h2>
          <input
            type="file"
            accept="image/*"
            id="file-upload"
            className="hidden"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <div className="flex justify-center items-center cursor-pointer bg-gray-700 text-white p-2 rounded-lg hover:opacity-90 transition">
              <FiUpload size={16} />
              <span className="ml-2">Choose a file</span>
            </div>
          </label>
          {preview ? (
            <div className="mt-4 flex justify-center flex-col items-center">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-auto object-contain rounded-lg"
              />
              <button
                onClick={handleFileDelete}
                className="mt-2 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition w-fit px-4 items-center justify-center text-center"
              >
                <div className="flex gap-2 items-center">
                  <FaTrash size={16} />
                  Remove File
                </div>
              </button>
            </div>
          ) : (
            <p className="text-gray-500 mt-2">No file selected</p>
          )}
          <button
            onClick={() => setIsFileUploadModalOpen(false)}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
