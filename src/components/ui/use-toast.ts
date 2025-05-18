
// Re-export from the hooks file - this breaks the circular dependency
import { useToast, toast } from "@/hooks/use-toast";

export { useToast, toast };
export type { Toast } from "@/hooks/use-toast";
