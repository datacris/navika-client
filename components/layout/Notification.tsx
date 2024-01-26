import { ToastOptions, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export enum AlertType {
  warn = "warn",
  info = "info",
  success = "success",
  error = "error",
  loading = "loading",
}
interface NotificationProps {
  message?: string;
  type?: AlertType;
  options?: ToastOptions;
  isLoading?: boolean;
}
const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  transition: Zoom,
};

export const showNotification = async (props: NotificationProps) => {
  const { message, type, options, isLoading } = props;

  if (isLoading) {
    const loadingId = toast.loading("Please wait...");
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        toast.update(loadingId, {
          render: "All is good",
          type: AlertType.success,
          isLoading: false,
          autoClose: 500
        });
        resolve();
      }, 1500)
    );
  }

  switch (type) {
    case AlertType.warn:
      return toast.warn(message, { ...defaultOptions, ...options });
    case AlertType.info:
      return toast.info(message, { ...defaultOptions, ...options });
    case AlertType.success:
      return toast.success(message, { ...defaultOptions, ...options });
    case AlertType.error:
      return toast.error(message, { ...defaultOptions, ...options });
    default:
      return toast(message, { ...defaultOptions, ...options });
  }
};
