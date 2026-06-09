import { useState, useEffect } from "react";
import "./Toast.css";

const Toast = ({ id, message, type = "info", duration = 4000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose(id), 200);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, id, onClose]);

  const getEmoji = () => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      case "info":
      default:
        return "ℹ";
    }
  };

  return (
    <div
      className={`toast toast-${type} ${isVisible ? "toast-visible" : "toast-hidden"}`}
    >
      <div className="toast_icon">{getEmoji()}</div>
      <div className="toast_message">{message}</div>
    </div>
  );
};

export default Toast;
