import React from 'react';
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../api/auth';
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  //removes token from cookies and sets user isLoggedIn to false inside local storage
  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("isLoggedIn");
      navigate("/");
    } catch (error) {
      toast.error("Logout Failed");
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white shadow-md">
      <h2 className="text-xl font-bold cursor-pointer">Expense Tracker</h2>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/my-groups")}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg transition duration-200"
        >
          My Groups
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded-lg transition duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
