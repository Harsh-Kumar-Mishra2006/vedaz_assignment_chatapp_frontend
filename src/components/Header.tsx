import React from "react";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../hooks/useSocket";
import toast from "react-hot-toast";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { isConnected } = useSocket();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await logout();
      toast.success("Logged out successfully");
    }
  };

  return (
    <header className="bg-chat-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl">💬</div>
            <div>
              <h1 className="text-xl font-semibold">Chat Room</h1>
              <div className="flex items-center space-x-2 text-sm">
                <div
                  className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400" : "bg-red-400"}`}
                />
                <span className="opacity-90">
                  {isConnected ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-sm">
              <span className="opacity-75">Logged in as</span>
              <span className="font-semibold ml-1">{user?.username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
