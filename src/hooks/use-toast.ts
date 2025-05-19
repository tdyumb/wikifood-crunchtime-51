
import * as React from "react";
import { toast as sonnerToast } from "sonner";

// Create a type for our toast system that doesn't extend ToastProps to avoid conflicts
export interface Toast {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
  duration?: number;
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
    sonner: sonnerToast,
    // Add direct toast method to match existing API usage
    toast: (props: Omit<Toast, "id">) => {
      addToast(props);
    }
  };
};

// Create a standalone toast function for easier imports
export const toast = {
  // Original toast methods
  async: (props: Omit<Toast, "id">) => {
    // We can't use hooks in a standalone function, so we'll use sonnerToast instead
    return sonnerToast(props.title as string, {
      description: props.description,
      duration: props.duration,
    });
  },
  // Simple toast method matching the API used in components
  default: (props: Omit<Toast, "id">) => {
    // We can't use hooks in a standalone function, so we'll use sonnerToast instead
    sonnerToast(props.title as string, {
      description: props.description,
      duration: props.duration,
    });
  },
  // Sonner methods
  success: sonnerToast.success,
  error: sonnerToast.error,
  info: sonnerToast.info,
  warning: sonnerToast.warning,
  message: sonnerToast
};
