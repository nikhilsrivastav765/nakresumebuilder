import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const PersonalInfo = ({ template }) => { // Added template prop
    const { resumeData, updateSection } = useResume();
    const personalInfo = resumeData.personalInfo;
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(personalInfo.profilePicture || '');


    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            const file = e.target.files?.[0];
            if (file) {
                setImageFile(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewUrl(reader.result);
                };
                reader.readAsDataURL(file);
                updateSection('personalInfo', {
                    ...personalInfo,
                    profilePicture: URL.createObjectURL(file), // Store a local URL for preview
                });

            }
        } else {
            updateSection('personalInfo', {
                ...personalInfo,
                [name]: value,
            });
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Stagger the appearance of children
            },
        },
    };

    const inputVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const iconVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1 },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <User className="w-6 h-6 text-blue-500" />
                Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={inputVariants}>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="Full Name"
                        value={personalInfo.fullName}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm "
                    />
                </motion.div>
                <motion.div variants={inputVariants}>
                    <label htmlFor="professionalTitle" className="block text-sm font-medium text-gray-700">Professional Title</label>
                    <input
                        type="text"
                        id="professionalTitle"
                        name="professionalTitle"
                        placeholder="Professional Title"
                        value={personalInfo.professionalTitle}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                </motion.div>
                <motion.div variants={inputVariants}>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={personalInfo.email}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                </motion.div>
                <motion.div variants={inputVariants}>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Phone Number"
                        value={personalInfo.phone}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                </motion.div>
                <motion.div variants={inputVariants}>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Address"
                        value={personalInfo.address}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                </motion.div>
                <motion.div variants={inputVariants}>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn Profile URL</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Linkedin
                                className="w-5 h-5 text-gray-500"
                                variants={iconVariants}
                            />
                        </div>
                        <input
                            type="url"
                            id="linkedin"
                            name="linkedin"
                            placeholder="LinkedIn Profile URL"
                            value={personalInfo.linkedin}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm pl-10"
                        />
                    </div>
                </motion.div>
                <motion.div variants={inputVariants}>
                    <label htmlFor="github" className="block text-sm font-medium text-gray-700">GitHub Profile URL</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Github
                                className="w-5 h-5 text-gray-500"
                                variants={iconVariants}

                            />
                        </div>
                        <input
                            type="url"
                            id="github"
                            name="github"
                            placeholder="GitHub Profile URL"
                            value={personalInfo.github}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm pl-10"
                        />
                    </div>
                </motion.div>
                 
                    <motion.div variants={inputVariants}>
                        <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Picture</label>
                        <input
                            type="file"
                            id="profilePicture"
                            name="profilePicture"
                            accept="image/*" // Accept only images
                            onChange={handleChange}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        {previewUrl && (
                            <div className="mt-2">
                                <img
                                    src={previewUrl}
                                    alt="Profile Preview"
                                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                                />
                            </div>
                        )}
                    </motion.div>
                
            </div>
        </motion.div>
    );
};

export default PersonalInfo;
