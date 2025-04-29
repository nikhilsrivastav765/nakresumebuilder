import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const Summary = () => {
    const { resumeData, updateSection } = useResume();
    const summary = resumeData.summary;

    const handleChange = (e) => {
        updateSection('summary', e.target.value);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: 'easeInOut',
            },
        },
    };

    const inputVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-500" />
                Professional Summary
            </h2>
            <motion.div variants={inputVariants}>
                <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
                    Provide a brief overview of your professional background and key skills.
                </label>
                <textarea
                    id="summary"
                    value={summary}
                    onChange={handleChange}
                    placeholder="A highly skilled and experienced professional with a proven track record in [industry/field]. Expertise in [skill 1], [skill 2], and [skill 3]. Seeking a challenging role where I can leverage my abilities to drive success."
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm min-h-[120px] p-4
                               transition-all duration-300
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent" // Added focus styles
                />
                 <p className="mt-2 text-xs text-gray-500">
                    Tip: Highlight your most relevant skills and experiences for the job you're applying for.
                </p>
            </motion.div>
        </motion.div>
    );
};

export default Summary;
