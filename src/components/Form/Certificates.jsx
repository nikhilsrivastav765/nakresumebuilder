import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const Certificate = () => {
    const { resumeData, updateSection } = useResume();
    const certificates = resumeData.certificates;

    const handleChange = (index, e) => {
        const updated = [...certificates];
        updated[index][e.target.name] = e.target.value;
        updateSection('certificates', updated);
    };

    const addCertificate = () => {
        updateSection('certificates', [
            ...certificates,
            {
                name: '',
                issuer: '',
                date: '', // Added date field
            },
        ]);
    };

    const removeCertificate = (index) => {
        const updated = certificates.filter((_, i) => i !== index);
        updateSection('certificates', updated);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -20, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: "easeInOut" } },
        exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Certifications</h2>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
            >
                <AnimatePresence>
                    {certificates.map((cert, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            exit="exit"
                            className="bg-white p-4 rounded-lg shadow-md border border-gray-200 relative hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor={`name-${index}`} className="block text-sm font-medium text-gray-700">
                                        Certificate Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id={`name-${index}`}
                                        value={cert.name}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="Certificate Name"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`issuer-${index}`} className="block text-sm font-medium text-gray-700">
                                        Issuing Organization
                                    </label>
                                    <input
                                        type="text"
                                        name="issuer"
                                        id={`issuer-${index}`}
                                        value={cert.issuer}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="Issuing Organization"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                                 <div>
                                    <label htmlFor={`date-${index}`} className="block text-sm font-medium text-gray-700">
                                        Date
                                    </label>
                                    <input
                                        type="text"
                                        name="date"
                                        id={`date-${index}`}
                                        value={cert.date}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="Date"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <motion.button
                                onClick={() => removeCertificate(index)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors duration-200"
                                title="Remove Certificate"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Trash2 className="w-5 h-5" />
                            </motion.button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            <button
                onClick={addCertificate}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md shadow-md transition-colors duration-300 flex items-center gap-2"
            >
                + Add Certification
            </button>
        </div>
    );
};

export default Certificate;
