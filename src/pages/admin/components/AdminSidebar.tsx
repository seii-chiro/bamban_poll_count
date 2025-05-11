import {type Dispatch, type SetStateAction } from 'react';
import { FaBars, FaTh, FaMapMarkedAlt, FaUser, FaUsersCog, FaCogs, FaTools, FaSignOutAlt, FaTachometerAlt, FaLayerGroup, FaUserCircle, FaListAlt } from 'react-icons/fa';

const menuItems = [
  { name: 'Modules', icon: <FaLayerGroup /> },
  { name: 'Home', icon: <FaTh /> },
  { name: 'Dashboard', icon: <FaTachometerAlt /> },
  { name: 'Map', icon: <FaMapMarkedAlt /> },
  { name: 'Users', icon: <FaUser /> },
  { name: 'Roles', icon: <FaUsersCog /> },
  { name: 'Settings', icon: <FaCogs /> },
  { name: 'Maintenance', icon: <FaTools /> },
  { name: 'Login Logs', icon: <FaListAlt /> },
  { name: 'My Account', icon: <FaUserCircle /> },
  { name: 'Logout', icon: <FaSignOutAlt /> }
];
interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const AdminSidebar = ({ isOpen, setIsOpen }: AdminSidebarProps) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-[#275316] text-white p-4 transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}
    >
      {/* Toggle Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-lg font-bold transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
          Admin Panel
        </h1>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
          <FaBars size={20} />
        </button>
      </div>

      {/* Menu Items */}
      <ul className="space-y-3">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-4 px-3 py-2 rounded hover:bg-[#3C7A29] cursor-pointer transition-all"
          >
            <span className="text-lg">{item.icon}</span>
            <span className={`text-sm font-medium transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;

