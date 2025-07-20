// Toaster.jsx
import React from "react";
import { useToast } from '../../Hooks/use-toast'

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div style={styles.viewport}>
      {toasts.map(({ id, title, description }) => (
        <div key={id} style={styles.toast}>
          <div style={styles.content}>
            {title && <strong style={styles.title}>{title}</strong>}
            {description && <p style={styles.description}>{description}</p>}
          </div>
          <button onClick={() => dismiss(id)} style={styles.close}>
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  viewport: {
    position: "fixed",
    bottom: "1rem",
    right: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    zIndex: 9999,
  },
  toast: {
    background: "#333",
    color: "#fff",
    padding: "1rem",
    borderRadius: "6px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    minWidth: "250px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    marginBottom: "4px",
    display: "block",
  },
  description: {
    margin: 0,
    fontSize: "0.875rem",
  },
  close: {
    background: "transparent",
    color: "#fff",
    border: "none",
    fontSize: "1.2rem",
    cursor: "pointer",
    marginLeft: "10px",
  },
};
