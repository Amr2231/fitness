import { toast } from "sonner";

const baseStyle = {
  fontSize: "18px",
};

export const Toast = {
  success: (message: string) =>
    toast.success(message, {
      style: baseStyle,
    }),

  error: (message: string) =>
    toast.error(message, {
      style: baseStyle,
    }),

  info: (message: string) =>
    toast(message, {
      style: baseStyle,
    }),
};
