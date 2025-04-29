    import React, { createContext, useContext, useState } from "react";

    const ResumeContext = createContext();

    export const useResume = () => useContext(ResumeContext);

    const defaultResumeData = {
        personalInfo: {
            fullName: "",
            email: "",
            phone: "",
            address: "",
            linkedin: "",
            github: "",
            professionalTitle: "", // Added
            profilePicture: "", // Added
        },
        experience: [
            {
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                description: '',
                location: '',  // Added
            },
        ],
        education: [
            {
                institution: '',
                degree: '',
                field: '',
                startYear: '',
                endYear: '',
                location: '', // Added
            },
        ],
        skills: [],
        certificates: [
            {
                name: '',
                issuer: '',
                date: '', // Added
            },
        ],
        customSections: [],
        summary: "",
    };

    export const ResumeProvider = ({ children }) => {
        const [resumeData, setResumeData] = useState(defaultResumeData);

        const updateSection = (section, value) => {
            setResumeData(prev => ({
                ...prev,
                [section]: value,
            }));
        };

        const addToSection = (section, item) => {
            setResumeData(prev => ({
                ...prev,
                [section]: [...prev[section], item],
            }));
        };

        const removeFromSection = (section, index) => {
            setResumeData(prev => ({
                ...prev,
                [section]: prev[section].filter((_, i) => i !== index),
            }));
        };

        const resetResume = () => setResumeData(defaultResumeData);


        return (
            <ResumeContext.Provider value={{
                resumeData,
                setResumeData,
                updateSection,
                addToSection,
                removeFromSection,
                resetResume
            }}>
                {children}
            </ResumeContext.Provider>
        );
    };
