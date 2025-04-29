import { auth } from "../auth/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
