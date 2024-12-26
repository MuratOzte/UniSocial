import eventSlice from "@/store/Slices/eventsSlice";
import React, { useEffect, useState } from "react";
import Loading from "../common/Loading";
import { useCommunities } from "@/hooks/useCommunities";
const ClubCard = ({
  name,
  description,
  type,
  image,
  university,
  communityId,
  communityMembers,
}) => {
  const { refreshCommunities } = useCommunities();
  const [isJoined, setIsJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (communityMembers.length == 0) {
      return;
    }
    if (communityMembers.map((e) => console.log(e.user.id == userId))) {
      setIsJoined(true);
    } else {
      setIsJoined(false);
    }
  }, []);

  const joinClub = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "http://localhost:3000/api/toggle-community",
        {
          method: "POST",
          body: JSON.stringify({
            communityId: communityId,
          }),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setIsJoined((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    refreshCommunities();
  };

  return (
    <div style={styles.card} className="w-[500px]">
      <img
        src={image || "https://via.placeholder.com/100"}
        alt={`${name} logo`}
        style={styles.image}
      />
      <div style={styles.content}>
        <h2 style={styles.title}>{name}</h2>
        <p style={styles.description}>{description}</p>
        <p style={styles.type}>
          Tür: <strong>{type}</strong>
        </p>
        <p style={styles.university}>
          {type == "Şirket" ? "Sektör:" : "Üniversite"}{" "}
          <strong>{university}</strong>
        </p>
      </div>
      <button
        style={styles.joinButton}
        className="flex justify-center item-center"
        onClick={joinClub}
        disabled={isLoading}
      >
        {isLoading ? <Loading /> : isJoined ? "Following" : "Follow"}
      </button>
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "16px",
    maxWidth: "600px",
    margin: "16px auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
  },
  image: {
    width: "120px",
    height: "120px",
    borderRadius: "12px",
    objectFit: "cover",
    marginRight: "16px",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: "1.5em",
    margin: "8px 0",
    color: "#333",
  },
  description: {
    fontSize: "1em",
    margin: "8px 0",
    color: "#555",
  },
  type: {
    fontSize: "0.9em",
    color: "#888",
  },
  university: {
    fontSize: "1em",
    color: "#444",
    marginTop: "8px",
  },
  joinButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1em",
    transition: "background-color 0.3s ease",
    width: 100,
    height: 50,
  },
};

export default ClubCard;
