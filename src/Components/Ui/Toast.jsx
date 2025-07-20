// Pure React version of Toast Component (without Radix UI, class-variance-authority, or Tailwind)

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

// Toast Context for global access
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => removeToast(id), toast.duration || 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={styles.viewport}>
        {toasts.map((toast) => (
          <Toast {...toast} key={toast.id} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};

const Toast = ({ title, description, variant = 'default', onClose }) => {
  return (
    <div style={{ ...styles.toast, ...styles[variant] }}>
      <div>
        <div style={styles.title}>{title}</div>
        {description && <div style={styles.description}>{description}</div>}
      </div>
      <button onClick={onClose} style={styles.close}>&times;</button>
    </div>
  );
};

// Simple inline styles
const styles = {
  viewport: {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    zIndex: 9999,
  },
  toast: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    minWidth: '250px',
  },
  default: {
    borderLeft: '5px solid #007bff',
  },
  destructive: {
    borderLeft: '5px solid #dc3545',
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '14px',
  },
  description: {
    fontSize: '12px',
    opacity: 0.9,
  },
  close: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    marginLeft: '1rem',
  },
};
