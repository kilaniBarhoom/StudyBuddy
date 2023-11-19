import { Navigate } from "react-router-dom";

export default function ProtectedAuth({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
