import React from "react";
import { useCommunities } from "@/hooks/useCommunities";

const JoinedCommunities = () => {
  const { joinedCommunities } = useCommunities();

  // Inline Styling
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
    },
    list: {
      listStyle: "none",
      padding: 0,
    },
    listItem: {
      marginBottom: "20px",
      padding: "15px",
      backgroundColor: "#ffffff",
      border: "1px solid #ddd",
      borderRadius: "6px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    listItemLast: {
      marginBottom: 0,
    },
    image: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "1px solid #ddd",
    },
    details: {
      flex: "1",
    },
    name: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#555",
      marginBottom: "8px",
    },
    description: {
      fontSize: "14px",
      color: "#777",
      marginBottom: "5px",
    },
    field: {
      fontSize: "14px",
      color: "#333",
    },
    admin: {
      fontSize: "14px",
      color: "#333",
    },
    noCommunities: {
      textAlign: "center",
      fontSize: "16px",
      color: "#888",
      marginTop: "20px",
    },
  };

  if (!joinedCommunities || joinedCommunities.length === 0) {
    return <p style={styles.noCommunities}>No joined communities yet!</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Joined Communities</h2>
      <ul style={styles.list}>
        {joinedCommunities.map((community, index) => (
          <li
            key={community.id}
            style={{
              ...styles.listItem,
              ...(index === joinedCommunities.length - 1 && styles.listItemLast),
            }}
          >
            {/* Fotoğraf */}
            <img
              src={community.profilePicture || "https://via.placeholder.com/60"}
              alt={`${community.name} Profile`}
              style={styles.image}
            />
            {/* Detaylar */}
            <div style={styles.details}>
              <h3 style={styles.name}>{community.name}</h3>
              <p style={styles.description}>
                {community.description || "No description provided."}
              </p>
              {community.activityField && (
                <p style={styles.field}>
                  <strong>Activity Field:</strong> {community.activityField}
                </p>
              )}
              {community.CommunityMember?.length > 0 && (
                <p style={styles.admin}>
                  <strong>Admin:</strong> {community.CommunityMember[0].user.name}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JoinedCommunities;
