
import { toast as sonnerToast } from "sonner";
import { type ToastProps } from "@/components/ui/toast";

// Create a type for our toast system
export interface Toast extends ToastProps {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

// State for the toast
export const useToast = () => {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = React.useCallback(
    (toast: Omit<Toast, "id">) => {
      setToasts((state) => [
        ...state,
        { id: Math.random().toString(36).slice(2), ...toast },
      ]);
    },
    []
  );

  const dismissToast = React.useCallback((id: string) => {
    setToasts((state) => state.filter((toast) => toast.id !== id));
  }, []);

  return {
    toasts,
    addToast,
    dismissToast,
    // Add ability to use sonner toast directly
    sonner: sonnerToast
  };
};

// Create a standalone toast function for easier imports
export const toast = {
  // Original toast methods
  async: (props: Omit<Toast, "id">) => {
    const { toasts, addToast, dismissToast } = useToast();
    addToast(props);
    return {
      id: toasts[toasts.length - 1]?.id,
      dismiss: () => dismissToast(toasts[toasts.length - 1]?.id),
      update: (props: Toast) => {
        dismissToast(toasts[toasts.length - 1]?.id);
        addToast(props);
      },
    };
  },
  // Sonner methods
  success: sonnerToast.success,
  error: sonnerToast.error,
  info: sonnerToast.info,
  warning: sonnerToast.warning,
  message: sonnerToast
};

// Add React import needed for useState and useCallback
import React from "react";
