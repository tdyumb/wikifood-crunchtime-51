
import { toast as sonnerToast } from "sonner";
import { useToast as useToastShadcn } from "@/components/ui/use-toast";
import { type Toast } from "@/components/ui/use-toast";

// Re-export the original useToast hook
export { useToast as useToastShadcn } from "@/components/ui/use-toast";

// Create an enhanced useToast hook that provides both toast systems
export const useToast = () => {
  const shadcnToast = useToastShadcn();

  return {
    ...shadcnToast,
    // Add ability to use sonner toast directly
    sonner: sonnerToast
  };
};

// Create a standalone toast function for easier imports
export const toast = {
  // Shadcn toast methods
  ...useToastShadcn(),
  // Sonner methods
  success: sonnerToast.success,
  error: sonnerToast.error,
  info: sonnerToast.info,
  warning: sonnerToast.warning,
  message: sonnerToast
};
