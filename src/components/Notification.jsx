// src/components/Notification.jsx
import React from "react";

export default function Notification({ message, type }) {
  if (!message) return null;

  return (
    <div
      style={{
        padding: "12px 20px",
        margin: "15px 0",
        borderRadius: "8px",
        fontWeight: "500",
        color: type === "success" ? "#155724" : "#721c24",
        backgroundColor: type === "success" ? "#d4edda" : "#f8d7da",
        border: `1px solid ${
          type === "success" ? "#c3e6cb" : "#f5c6cb"
        }`,
      }}
    >
      {message}
    </div>
  );
}
