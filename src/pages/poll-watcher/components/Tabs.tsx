import { useState, useEffect, useRef, type SetStateAction } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import LogoutConfirmModal from './LogoutConfirm';

const tabs = ['Election Day', 'Reports', 'My Account', 'Sign Out'];

type Props = {
    activeTab: string;
    setActiveTab: React.Dispatch<SetStateAction<string>>;
    onLogout: () => void; 
};

const Tabs = ({ activeTab, setActiveTab, onLogout }: Props) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleTabClick = (tab: string) => {
        if (tab === 'Sign Out') {
            setShowLogoutModal(true);
        } else {
            setActiveTab(tab);
        }
        setIsDropdownOpen(false);
    };

    const handleLogoutConfirm = () => {
        setShowLogoutModal(false);
        onLogout(); 
    };

    return (
        <div className="w-full">
            {/* Desktop */}
            <ul className="w-full hidden md:flex items-center justify-center gap-10">
                {tabs.map((tab) => (
                    <li
                        key={tab}
                        onClick={() => handleTabClick(tab)}
                        className={`
              text-lg font-semibold px-2 py-1 rounded-md w-40 text-center cursor-pointer 
              transition-colors duration-200
              ${activeTab === tab
                                ? 'bg-[#7030A0] text-white'
                                : 'bg-[#D9F2D0] text-black hover:bg-[#e6d9f5]'}
            `}
                    >
                        {tab}
                    </li>
                ))}
            </ul>

            {/* Mobile */}
            <div className="relative md:hidden" ref={dropdownRef}>
                <button
                    className="flex items-center justify-between w-full py-3 px-4 bg-white text-[#7030A0] font-semibold"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                >
                    <span>{activeTab}</span>
                    <IoChevronDown
                        className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                        size={20}
                    />
                </button>

                <div
                    className={`
            absolute top-full left-0 right-0 bg-white shadow-lg z-10 mt-1 rounded overflow-hidden
            transition-all duration-300 origin-top
            ${isDropdownOpen ? 'opacity-100 scale-y-100 max-h-64' : 'opacity-0 scale-y-0 max-h-0'}
          `}
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabClick(tab)}
                            className={`
                w-full text-left py-3 px-4 cursor-pointer text-sm transition-colors duration-150
                ${activeTab === tab
                                    ? 'bg-[#F0E8FA] text-[#7030A0] font-semibold'
                                    : 'hover:bg-gray-100 text-gray-800'}
              `}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <LogoutConfirmModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogoutConfirm}
            />
        </div>
    );
};

export default Tabs;
