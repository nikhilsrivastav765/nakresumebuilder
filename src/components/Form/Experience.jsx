    import React, { useState, useEffect } from 'react';
    import { useResume } from '../../context/ResumeContext';
    import { motion, AnimatePresence } from 'framer-motion';
    import { PlusCircle, MinusCircle, Briefcase } from 'lucide-react';

    const Experience = () => {
        const { resumeData, updateSection } = useResume();
        const [experiences, setExperiences] = useState(resumeData.experience);

        useEffect(() => {
            setExperiences(resumeData.experience);
        }, [resumeData.experience]);

        const handleChange = (index, e) => {
            const updated = [...experiences];
            updated[index][e.target.name] = e.target.value;
            setExperiences(updated);
            updateSection('experience', updated);
        };

        const addExperience = () => {
            const newExperience = [
                ...experiences,
                {
                    company: '',
                    position: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                    location: '', // Added location
                },
            ];
            setExperiences(newExperience);
            updateSection('experience', newExperience);
        };

        const removeExperience = (index) => {
            const updated = experiences.filter((_, i) => i !== index);
            setExperiences(updated);
            updateSection('experience', updated);
        };

        // Animation variants
        const experienceVariants = {
            hidden: { opacity: 0, y: -10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
            exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
        };

        const buttonVariants = {
            hover: { scale: 1.1 },
            tap: { scale: 0.9 },
        };

        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Briefcase className="w-6 h-6 text-blue-500" />
                    Experience
                </h2>
                <AnimatePresence>
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            variants={experienceVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="border rounded-lg p-4 space-y-4 relative bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor={`company-${index}`} className="block text-sm font-medium text-gray-700">Company</label>
                                    <input
                                        type="text"
                                        id={`company-${index}`}
                                        name="company"
                                        value={exp.company}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="Company"
                                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`position-${index}`} className="block text-sm font-medium text-gray-700">Position</label>
                                    <input
                                        type="text"
                                        id={`position-${index}`}
                                        name="position"
                                        value={exp.position}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="Position"
                                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div className="col-span-full md:col-span-2 flex gap-4">
                                    <div>
                                        <label htmlFor={`startDate-${index}`} className="block text-sm font-medium text-gray-700">Start Date</label>
                                        <input
                                            type="date"
                                            id={`startDate-${index}`}
                                            name="startDate"
                                            value={exp.startDate}
                                            onChange={(e) => handleChange(index, e)}
                                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`endDate-${index}`} className="block text-sm font-medium text-gray-700">End Date</label>
                                        <input
                                            type="date"
                                            id={`endDate-${index}`}
                                            name="endDate"
                                            value={exp.endDate}
                                            onChange={(e) => handleChange(index, e)}
                                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor={`location-${index}`} className="block text-sm font-medium text-gray-700">Location</label>
                                    <input
                                        type="text"
                                        id={`location-${index}`}
                                        name="location"
                                        value={exp.location}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="Location"
                                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        id={`description-${index}`}
                                        name="description"
                                        value={exp.description}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="Job Description"
                                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        rows={3}
                                    />
                                </div>
                            </div>
                            <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={() => removeExperience(index)}
                                className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-colors duration-200"
                                title="Remove Experience"
                            >
                                <MinusCircle className="w-6 h-6" />
                            </motion.button>
                        </motion.div>
                    ))}
                </AnimatePresence>

                <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={addExperience}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-3 px-6 transition-colors duration-300 flex items-center gap-2"
                >
                    <PlusCircle className="w-5 h-5" />
                    Add Experience
                </motion.button>
            </div>
        );
    };

    export default Experience;
