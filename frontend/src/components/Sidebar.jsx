// src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import {  FiGrid } from 'react-icons/fi'; 
const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: FiHome },
  { name: 'Profile', path: '/profile', icon: FiUser },
  { name: 'ComponentsDemo', path: '/components-demo', icon: FiGrid },
];

const Sidebar = ({ isMobileOpen, closeMobileSidebar }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    closeMobileSidebar(); // Close sidebar on mobile after action
  };

  return (
    // Key Changes: 
    // 1. Used 'h-screen' to explicitly ensure full viewport height.
    // 2. Used 'w-64' for width (consistent with previous).
    <div
      className={`
        fixed z-20 h-screen bg-gray-900 text-white w-64 flex flex-col 
        transform transition-transform duration-200 ease-in-out 
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:relative md:translate-x-0
      `}
    >
      {/* 1. Dashboard Title Area (Header) */}
      <div className="flex items-center h-16 px-4 bg-gray-900 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        {/* Mobile close button for responsive design */}
        <button className="absolute right-4 md:hidden text-white" onClick={closeMobileSidebar}>
          &times;
        </button>
      </div>

      {/* 2. Navigation Links (flex-1 ensures this section takes all remaining space) */}
      <nav className="flex-1 space-y-2 py-4">
        {navItems.map((item) => {
            // Check if the current path starts with the item path (for active state)
            const isActive = location.pathname.startsWith(item.path);

            return (
                <Link
                    key={item.name}
                    to={item.path}
                    onClick={closeMobileSidebar}
                    className={`
                        flex items-center space-x-3 text-sm font-medium py-3 px-6 transition duration-150 ease-in-out
                        ${
                            isActive 
                                ? 'bg-indigo-600 text-white' // Solid color for active link
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white' // Hover effect for inactive
                        }
                    `}
                >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                </Link>
            );
        })}
      </nav>
      
      {/* 3. Logout Link (fixed to the bottom of the navigation area) */}
      {/* Note: If you want the logout button physically at the bottom of the screen, 
         you would need to adjust the flex container structure. For typical UI, 
         placing it at the end of the menu is standard, which this structure does. */}
      <div className="mt-auto p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full text-left flex items-center space-x-3 py-3 px-6 text-sm font-medium text-gray-300 hover:bg-red-700 hover:text-white transition duration-150 ease-in-out rounded-lg"
        >
          <FiLogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

    </div>
  );
};

export default Sidebar;