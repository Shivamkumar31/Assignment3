// src/components/Navbar.jsx
import { FiMenu, FiBell } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-10">
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 md:hidden" onClick={toggleSidebar}>
          <FiMenu className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 hidden md:block">
          Welcome, {user?.username || 'User'}!
        </h2>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 transition duration-150">
          <FiBell className="w-6 h-6 text-gray-600" />
        </button>
        <Link to="/profile" className="flex items-center space-x-2 cursor-pointer">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={`https://ui-avatars.com/api/?name=${user?.name || user?.username || 'U'}&background=312e81&color=fff&bold=true`}
            alt="User Avatar"
          />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;