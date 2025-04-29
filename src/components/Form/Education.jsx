import React, { useState, useEffect, useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, MinusCircle, GraduationCap } from 'lucide-react';

const Education = () => {
    const { resumeData, updateSection } = useResume();
    const [education, setEducation] = useState(resumeData.education);
    const containerRef = useRef(null);

    useEffect(() => {
        setEducation(resumeData.education);
    }, [resumeData.education]);

    const handleChange = (index, e) => {
        const updated = [...education];
        updated[index][e.target.name] = e.target.value;
        setEducation(updated);
        updateSection('education', updated);
    };

    const addEducation = () => {
        const newEducation = [
            ...education,
            {
                institution: '',
                degree: '',
                field: '',
                startYear: '',
                endYear: '',
                location: '',
            },
        ];
        setEducation(newEducation);
        updateSection('education', newEducation);
    };

    const removeEducation = (index) => {
        const updated = education.filter((_, i) => i !== index);
        setEducation(updated);
        updateSection('education', updated);
    };

    const educationVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
    };

    const buttonVariants = {
        hover: { scale: 1.1 },
        tap: { scale: 0.9 },
    };

    return (
        <div className="space-y-6" ref={containerRef}>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-blue-500" />
                Education
            </h2>

            <AnimatePresence>
                {education.map((edu, index) => (
                    <motion.div
                        key={index}
                        variants={educationVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="border rounded-lg p-4 space-y-4 relative bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor={`institution-${index}`} className="block text-sm font-medium text-gray-700">Institution Name</label>
                                <input
                                    type="text"
                                    id={`institution-${index}`}
                                    name="institution"
                                    value={edu.institution}
                                    onChange={(e) => handleChange(index, e)}
                                    placeholder="Institution Name"
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor={`degree-${index}`} className="block text-sm font-medium text-gray-700">Degree</label>
                                <input
                                    type="text"
                                    id={`degree-${index}`}
                                    name="degree"
                                    value={edu.degree}
                                    onChange={(e) => handleChange(index, e)}
                                    placeholder="Degree"
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor={`field-${index}`} className="block text-sm font-medium text-gray-700">Field of Study</label>
                                <input
                                    type="text"
                                    id={`field-${index}`}
                                    name="field"
                                    value={edu.field}
                                    onChange={(e) => handleChange(index, e)}
                                    placeholder="Field of Study"
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor={`location-${index}`} className="block text-sm font-medium text-gray-700">Location</label>
                                <input
                                    type="text"
                                    id={`location-${index}`}
                                    name="location"
                                    value={edu.location}
                                    onChange={(e) => handleChange(index, e)}
                                    placeholder="Location"
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                            <div className="col-span-full md:col-span-2 flex gap-4">
                                <div>
                                    <label htmlFor={`startYear-${index}`} className="block text-sm font-medium text-gray-700">Start Year</label>
                                    <input
                                        type="text"
                                        id={`startYear-${index}`}
                                        name="startYear"
                                        value={edu.startYear}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="Start Year"
                                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`endYear-${index}`} className="block text-sm font-medium text-gray-700">End Year</label>
                                    <input
                                        type="text"
                                        id={`endYear-${index}`}
                                        name="endYear"
                                        value={edu.endYear}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="End Year"
                                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                        <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => removeEducation(index)}
                            className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-colors duration-200"
                            title="Remove Education"
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
                onClick={addEducation}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-3 px-6 transition-colors duration-300 flex items-center gap-2"
            >
                <PlusCircle className="w-5 h-5" />
                Add Education
            </motion.button>
        </div>
    );
};

export default Education;
