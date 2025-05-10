import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDown } from 'react-icons/io5';

interface SelectProps {
    options: string[];
    defaultValue?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    className?: string;
}

const Select = ({
    options = [],
    defaultValue = '',
    placeholder = 'Select an option',
    onChange = () => { },
    disabled = false,
    className = '',
}: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(defaultValue);
    const selectRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange(option);
    };

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div
            ref={selectRef}
            className={`relative ${className}`}
        >
            <motion.button
                whileTap={disabled ? {} : { scale: 0.98 }}
                onClick={toggleDropdown}
                className={`flex items-center justify-between w-full p-3 text-left bg-white border rounded-md shadow-sm ${disabled
                    ? 'cursor-not-allowed opacity-60 bg-gray-100'
                    : 'cursor-pointer hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                type="button"
            >
                <span className={`block truncate ${!selectedOption && 'text-gray-500'}`}>
                    {selectedOption || placeholder}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <IoChevronDown className={`w-5 h-5 ${disabled ? 'text-gray-400' : 'text-gray-600'}`} />
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
                    >
                        <ul
                            className="py-1"
                            role="listbox"
                        >
                            {options.map((option, index) => (
                                <motion.li
                                    key={index}
                                    whileHover={{ backgroundColor: '#f3f4f6' }}
                                    onClick={() => handleSelect(option)}
                                    className="px-3 py-2 cursor-pointer text-gray-900 hover:bg-gray-100"
                                    role="option"
                                    aria-selected={option === selectedOption}
                                >
                                    {option}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Select;