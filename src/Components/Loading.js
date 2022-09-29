import React from "react";

const Loading = () => {
  return (
    <div style={{ position: "relative" }}>
      <h2
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-300"
          role="status"
        >
        </div>
      </h2>
    </div>
  );
};

export default Loading;
