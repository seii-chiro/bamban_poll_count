// components/CustomSelect.tsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDown } from 'react-icons/io5';

interface Precinct {
    id: string;
    label: string;
    title: string;
    }

    interface CustomSelectProps {
    options: Precinct[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    }

    const CustomSelect = ({
    options,
    value,
    onChange,
    placeholder = 'Select Precinct',
    disabled = false,
    className = '',
    }: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

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

    const selectedOption = options.find(opt => opt.id === value)?.label || '';

    const handleSelect = (id: string) => {
        onChange(id);
        setIsOpen(false);
    };

    return (
        <div ref={selectRef} className={`relative ${className}`}>
        <motion.button
            whileTap={disabled ? {} : { scale: 0.98 }}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className={`flex items-center justify-between w-full p-3 text-left bg-white border border-gray-300 rounded-md shadow-sm ${
            disabled
                ? 'cursor-not-allowed opacity-60 bg-gray-100'
                : 'cursor-pointer outline-none focus:ring-2 focus:ring-green-700'
            }`}
            disabled={disabled}
            type="button"
        >
            <span className={`block truncate ${!value && 'text-gray-500'}`}>
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
                <ul className="py-1">
                {options.map((opt) => (
                    <motion.li
                    key={opt.id}
                    whileHover={{ backgroundColor: '#f3f4f6' }}
                    onClick={() => handleSelect(opt.id)}
                    className="px-3 py-2 cursor-pointer text-gray-900 hover:bg-gray-100 truncate"
                    title={opt.title}
                    >
                    {opt.label}
                    </motion.li>
                ))}
                </ul>
            </motion.div>
            )}
        </AnimatePresence>
        </div>
    );
};

export default CustomSelect;
