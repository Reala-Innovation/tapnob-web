"use client";

import React, { createContext, useContext, useRef } from "react";
import { Toast } from "primereact/toast";
import { ToastMessage } from "primereact/toast";

interface ToastContextType {
  showToast: (message: ToastMessage | ToastMessage[]) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastContextProvider");
  }
  return context;
};

const ToastContextProvider = ({ children }: { children: React.ReactNode }) => {
  const toastRef = useRef<Toast>(null);

  const showToast = (message: ToastMessage | ToastMessage[]) => {
    toastRef.current?.show(message);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} position="top-right" />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;
