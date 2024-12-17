import React from "react";

const Event = ({ eventData }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{eventData.title || "Event Title"}</h2>

      <div style={styles.details}>
        <p style={styles.info}><strong>Description:</strong> {eventData.description || "No description provided."}</p>
        <p style={styles.info}><strong>Date:</strong> {eventData.date || "TBA"}</p>
        <p style={styles.info}><strong>Time:</strong> {eventData.time || "TBA"}</p>
        <p style={styles.info}><strong>Location:</strong> {eventData.location || "To be announced"}</p>
        <p style={styles.info}><strong>Type:</strong> {eventData.eventType || "General"}</p>
        <p style={styles.info}><strong>Price:</strong> {eventData.price || "Free"}</p>
      </div>

      {eventData.file ? (
        <div style={styles.fileContainer}>
          <strong>Attached File:</strong>
          <p style={styles.fileName}>{eventData.file.name}</p>
          <embed src={URL.createObjectURL(eventData.file)} width="100%" height="200px" style={styles.filePreview} />
        </div>
      ) : (
        <p style={styles.noFile}>No file uploaded.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    padding: "20px",
    maxWidth: "700px",
    margin: "20px auto",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
    fontFamily: "'Roboto', sans-serif",
  },
  title: {
    marginBottom: "15px",
    color: "#2c3e50",
    fontSize: "24px",
    borderBottom: "2px solid #3498db",
    paddingBottom: "10px",
    textAlign: "center",
  },
  details: {
    marginTop: "10px",
    color: "#34495e",
    lineHeight: "1.6",
  },
  info: {
    margin: "5px 0",
    fontSize: "16px",
  },
  fileContainer: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#ecf0f1",
    borderRadius: "8px",
    textAlign: "center",
  },
  fileName: {
    fontStyle: "italic",
    margin: "5px 0",
  },
  filePreview: {
    marginTop: "10px",
    borderRadius: "6px",
  },
  noFile: {
    color: "#7f8c8d",
    fontStyle: "italic",
    textAlign: "center",
  },
};

export default Event;
