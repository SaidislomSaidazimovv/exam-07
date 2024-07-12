import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = ({ title, type, transition }) => {
  return toast(title, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: transition,
    type: type,
  });
};

export default Notification;
