import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { motion } from 'framer-motion';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

const LogoutConfirmModal = ({ isOpen, onClose, onConfirm }: Props) => {
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                {/* Overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
                </Transition.Child>

                {/* Modal content */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl"
                    >
                        <Dialog.Title className="text-lg font-bold text-gray-800">
                            Confirm Logout
                        </Dialog.Title>
                        <Dialog.Description className="text-sm text-gray-600 mt-2">
                            Are you sure you want to sign out? You’ll need to log in again to continue.
                        </Dialog.Description>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-4 py-2 text-sm rounded-md bg-[#7030A0] text-white hover:bg-purple-800"
                            >
                                Yes, Sign Out
                            </button>
                        </div>
                    </motion.div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default LogoutConfirmModal;
