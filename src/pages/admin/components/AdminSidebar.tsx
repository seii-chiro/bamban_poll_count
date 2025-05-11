import { useState, type Dispatch, type SetStateAction } from 'react';
import { NavLink } from 'react-router';
import tambulilogo from '../../../assets/logo.png';
import {
  FaTh,
  FaMapMarkedAlt,
  FaUser,
  FaUsersCog,
  FaCogs,
  FaTools,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUserCircle,
  FaListAlt,
} from 'react-icons/fa';
import LogoutConfirmModal from '@/pages/poll-watcher/components/LogoutConfirm';
import { useTokenStore } from '@/store/useTokenStore';
import useUserStore from '@/store/useUserStore';

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const moduleItems = [
  { name: 'Home', icon: <FaTh />, path: '/home' },
  { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/app/admin' },
  { name: 'Map', icon: <FaMapMarkedAlt />, path: '' },
  { name: 'Users', icon: <FaUser />, path: '' },
  { name: 'Roles', icon: <FaUsersCog />, path: '' },
  { name: 'Settings', icon: <FaCogs />, path: '' },
  { name: 'Maintenance', icon: <FaTools />, path: '' },
  { name: 'Login Logs', icon: <FaListAlt />, path: '' },
];

const accountItems = [
  { name: 'My Account', icon: <FaUserCircle />, path: '' },
];

const AdminSidebar = ({ isOpen, setIsOpen }: AdminSidebarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clearToken = useTokenStore()?.resetToken;
  const clearUser = useUserStore()?.clearUser;

  const logout = () => {
    clearToken();
    clearUser();
    setIsOpen(false); // Close the sidebar after logout
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-[#275316] text-white p-4 flex flex-col justify-between transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div>
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div
            className={`transition-all duration-300 ${
              isOpen ? 'w-32 h-32' : 'w-10 h-10'
            } overflow-hidden`}
          >
            <img src={tambulilogo} alt="Logo" className="object-contain w-full h-full" />
          </div>
        </div>

        {/* Modules Section */}
        <div>
          {isOpen && (
            <h2 className="text-gray-300 font-bold text-xs mb-2 px-1">MODULES</h2>
          )}
          <ul className="space-y-2 mb-6">
            {moduleItems.map((item, index) =>
              item.path ? (
                <NavLink
                  to={item.path}
                  key={index}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-3 py-2 rounded transition-all cursor-pointer hover:bg-[#3C7A29] ${
                      isActive ? 'bg-[#3C7A29]' : ''
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  <span
                    className={`text-sm font-medium transition-all duration-300 ${
                      isOpen ? 'block' : 'hidden'
                    }`}
                  >
                    {item.name}
                  </span>
                </NavLink>
              ) : (
                <div
                  key={index}
                  className="flex items-center gap-4 px-3 py-2 rounded text-gray-400 bg-opacity-10 cursor-not-allowed"
                  title="Not available"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span
                    className={`text-sm font-medium transition-all duration-300 ${
                      isOpen ? 'block' : 'hidden'
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              )
            )}
          </ul>
        </div>

        {/* Account Section */}
        <div>
          {isOpen && (
            <h2 className="text-gray-300 font-bold text-xs mb-2 px-1">ACCOUNT</h2>
          )}
          <ul className="space-y-2">
            {accountItems.map((item, index) =>
              item.path ? (
                <NavLink
                  to={item.path}
                  key={index}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-3 py-2 rounded transition-all cursor-pointer hover:bg-[#3C7A29] ${
                      isActive ? 'bg-[#3C7A29]' : ''
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  <span
                    className={`text-sm font-medium transition-all duration-300 ${
                      isOpen ? 'block' : 'hidden'
                    }`}
                  >
                    {item.name}
                  </span>
                </NavLink>
              ) : (
                <div
                  key={index}
                  className="flex items-center gap-4 px-3 py-2 rounded text-gray-400 bg-opacity-10 cursor-not-allowed"
                  title="Not available"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span
                    className={`text-sm font-medium transition-all duration-300 ${
                      isOpen ? 'block' : 'hidden'
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              )
            )}
          </ul>
        </div>
      </div>

      <div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-4 px-3 py-2 rounded hover:bg-[#3C7A29] transition-all cursor-pointer"
        >
          <span className="text-lg">
            <FaSignOutAlt />
          </span>
          <span
            className={`text-sm font-medium transition-all duration-300 ${
              isOpen ? 'block' : 'hidden'
            }`}
          >
            Logout
          </span>
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={logout}
      />
    </div>
  );
};

export default AdminSidebar;
