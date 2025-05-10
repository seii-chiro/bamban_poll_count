/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef, type SetStateAction } from 'react';
import { IoChevronDown } from "react-icons/io5";

const tabs = ['Election Day', 'Reports', 'My Account', 'Sign Out'];

const Tabs = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: { target: any; }) => {
            if (dropdownRef.current && !dropdownRef?.current?.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleTabClick = (tab: SetStateAction<string>) => {
        if (tab === 'Sign Out') {
            // logout logic here if needed
        }
        setActiveTab(tab);
        setIsDropdownOpen(false);
    };

    return (
        <div className="w-full">
            {/* Desktop Tabs */}
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

            {/* Mobile View - Just Active Tab Name with Dropdown */}
            <div className="relative md:hidden" ref={dropdownRef}>
                <div
                    className="flex items-center justify-end gap-6 py-3 px-4 bg-white text-[#7030A0] font-semibold cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <span>{activeTab}</span>
                    <IoChevronDown
                        className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                        size={20}
                    />
                </div>

                {/* Animated Dropdown Menu */}
                <div
                    className={`
                      absolute top-full left-0 right-0 bg-white shadow-lg z-10 mt-1 rounded overflow-hidden
                      transition-all duration-300 origin-top
                      ${isDropdownOpen ? 'opacity-100 scale-y-100 max-h-64' : 'opacity-0 scale-y-0 max-h-0'}
                    `}
                >
                    {tabs.map((tab) => (
                        <div
                            key={tab}
                            className={`
                              py-3 px-4 cursor-pointer transition-colors duration-150
                              ${activeTab === tab
                                    ? 'bg-[#F0E8FA] text-[#7030A0] font-semibold'
                                    : 'hover:bg-gray-100'}
                            `}
                            onClick={() => handleTabClick(tab)}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tabs;