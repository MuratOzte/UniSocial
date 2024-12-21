import React, { useState } from "react";

const ClubCard = ({
  name,
  description,
  type,
  image,
  university,
  communityId,
  communityMembers = [], // Varsayılan değer olarak boş bir dizi tanımlandı
}) => {
  const [isJoined, setIsJoined] = useState(
    communityMembers.includes(localStorage.getItem("userId")) // Kullanıcının zaten topluluğa katılıp katılmadığını kontrol ediyoruz
  );
  const userId = localStorage.getItem("userId");

  const toggleJoinClub = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/api/toggle-community", {
        method: "POST",
        body: JSON.stringify({
          communityId: communityId,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to toggle community status:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log(data);

      // `isJoined` durumunu tersine çevir
      setIsJoined((prevState) => !prevState);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  console.log("ClubCard", name, description, type, image, university);
  return (
    <div style={styles.card} className="w-[500px]">
      <img src={image} alt={`${name} logo`} style={styles.image} />
      <div style={styles.content}>
        <h2 style={styles.title}>{name}</h2>
        <p style={styles.description}>{description}</p>
        <p style={styles.type}>
          Tür: <strong>{type === "academic" ? "Akademik" : "Sosyal"}</strong>
        </p>
        <p style={styles.university}>
          Üniversite: <strong>{university}</strong>
        </p>
      </div>
      <button style={styles.joinButton} onClick={toggleJoinClub}>
        {isJoined ? "Katıldın" : "Katıl"}
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
    backgroundColor: "#fff",
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
  },
};

export default ClubCard;
