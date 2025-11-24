import React from "react";

const Toast = ({ type, message, isRTL, onClose }) => {
  const colors = {
    success: "toast-success",
    error: "toast-error",
    info: "toast-info",
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "info":
        return "ℹ";
      default:
        return "ℹ";
    }
  };

  if (!message) return null;

  return (
    <div
      className={`toast ${colors[type]} ${isRTL ? "toast-rtl" : "toast-ltr"}`}
      role="alert"
    >
      <div className="toast-content">
        <div className="toast-icon-container">
          <span className="toast-icon">{getIcon()}</span>
        </div>
        <p className="toast-message">{message}</p>
        <button
          onClick={onClose}
          className="toast-close"
          aria-label={isRTL ? "إغلاق" : "Close"}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast;
