    import React, { useRef } from 'react';
    import { useResume } from '../../context/ResumeContext';
    import {
        MapPin,
        Phone,
        Mail,
        Linkedin,
        Github,
        Calendar,
        Briefcase,
        GraduationCap,
        Award,
        Code,
        User,
    } from 'lucide-react';
    import html2pdf from 'html2pdf.js';

    const CreativePreview = () => {
        const { resumeData } = useResume();
        const resumeRef = useRef(null);
        
        const handleDownload = () => {
            const element = resumeRef.current;

            const opt = {
                margin: 0,
                filename: 'My_Resume.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 3, useCORS: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
            };

            html2pdf().set(opt).from(element).save();
        };


        // Helper function to format date ranges
        const formatDateRange = (start, end) => {
            if (!start) return 'Present';
            const startDate = new Date(start);
            const endDate = end ? new Date(end) : null;

            const startYear = startDate.getFullYear();
            const endYear = endDate ? endDate.getFullYear() : 'Present';

            return `${startYear} - ${endYear}`;
        };

        return (
            <div ref={resumeRef} className="bg-gray-100 p-4 flex justify-center font-['Arial'] break-words">
                <div className="bg-white shadow-lg rounded-lg p-8 lg:w-[210mm] min-h-[297mm] border border-gray-300 flex lg:flex-row    ">
                    {}
                    <div className="md:w-1/3 md:pr-8 flex flex-col items-center">
                        {}
                        <div className="rounded-full overflow-hidden w-48 h-48 border-4 border-gray-200 mb-6">
                            {resumeData.personalInfo.profilePicture ? (
                                <img
                                    src={resumeData.personalInfo.profilePicture}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                    <User className="w-16 h-16 text-gray-500" />
                                </div>
                            )}
                        </div>

                        {}
                        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
                            {resumeData.personalInfo.fullName || 'Your Name'}
                        </h1>
                        <p className="text-md text-gray-600 text-center mb-6">
                            {resumeData.personalInfo.professionalTitle || 'Graphic Designer'}
                        </p>

                        {}
                        <div className="mb-8 w-full">
                            <h2 className="text-lg font-semibold text-gray-800 uppercase mb-4 border-b border-gray-300 pb-1 flex items-center gap-2">
                                Contact
                            </h2>
                            <div className="text-gray-600 text-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <Mail size={16} />
                                    <span>{resumeData.personalInfo.email || 'info@yourmail.com'}</span>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Phone size={16} />
                                    <span>{resumeData.personalInfo.phone || '+0000 12345678'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    <span>{resumeData.personalInfo.address || 'New York City - 000'}</span>
                                </div>
                                {resumeData.personalInfo.linkedin && (
                                    <div className="flex items-center gap-2 mt-2">
                                        <Linkedin size={16} />
                                        <span>{resumeData.personalInfo.linkedin}</span>
                                    </div>
                                )}
                                {resumeData.personalInfo.github && (
                                    <div className="flex items-center gap-2 mt-2">
                                        <Github size={16} />
                                        <span>{resumeData.personalInfo.github}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                    
                    </div>

                    {}
                    <div className="md:w-2/3 md:pl-8">
                        {}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 uppercase mb-4 border-b border-gray-300 pb-1 flex items-center gap-2">
                                Profile
                            </h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                                {resumeData.summary ||
                                    "Highly skilled and imaginative Graphic Designer with a passion for translating ideas into captivating visual narratives. Proficient in leveraging design principles and cutting-edge software..."
                                }
                            </p>
                        </div>

                        {}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 uppercase mb-4 border-b border-gray-300 pb-1 flex items-center gap-2">
                                Education
                            </h2>
                            {resumeData.education.length > 0 ? (
                                resumeData.education.map((edu, index) => (
                                    <div key={index} className="mb-6">
                                        <div className="flex justify-between items-start md:items-center gap-2 flex-col md:flex-row">
                                            <h3 className="text-lg font-semibold text-gray-800">{edu.degree || 'Degree'}</h3>
                                            <p className="text-gray-600 text-sm">
                                                {formatDateRange(edu.startYear, edu.endYear)}
                                            </p>
                                        </div>
                                        <p className="text-gray-600 text-sm">{edu.institution || 'University Name'}</p>
                                        <p className="text-gray-600 text-sm">{edu.location || 'Location'}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No education added yet.</p>
                            )}
                        </div>

                        {}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 uppercase mb-4 border-b border-gray-300 pb-1 flex items-center gap-2">
                                Experience
                            </h2>
                            {resumeData.experience.length > 0 ? (
                                resumeData.experience.map((exp, index) => (
                                    <div key={index} className="mb-6">
                                        <div className="flex justify-between items-start md:items-center gap-2 flex-col md:flex-row">
                                            <h3 className="text-lg font-semibold text-gray-800">{exp.position || 'Job Title'}</h3>
                                            <p className="text-gray-600 text-sm">
                                                {formatDateRange(exp.startDate, exp.endDate)}
                                            </p>
                                        </div>
                                        <p className="text-gray-600 text-sm">{exp.company || 'Company Name'}</p>
                                        <p className="text-gray-700 leading-relaxed mt-2 whitespace-pre-line text-sm">
                                            {exp.description || "Job description..."}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No experience added yet.</p>
                            )}
                        </div>

                        {}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 uppercase mb-4 border-b border-gray-300 pb-1 flex items-center gap-2">
                                Skills
                            </h2>
                            {resumeData.skills.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4">
                                    {resumeData.skills.map((skill, index) => (
                                        <div key={index} className="flex items-center gap-2 text-sm">
                                            <span>{skill.name}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">No skills added yet.</p>
                            )}
                        </div>
                        {}
                        {resumeData.customSections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 uppercase mb-4 border-b border-gray-300 pb-1 flex items-center gap-2">
                                    {section.title || `Section ${sectionIndex + 1}`}
                                </h2>
                                {section.items && section.items.length > 0 ? (
                                    section.items.map((item, itemIndex) => (
                                        <div key={itemIndex} className="mb-4">
                                            {item.title && <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>}
                                            {item.subtitle &&  <p className="text-gray-600 text-sm">{item.subtitle}</p>}
                                            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">{item.description}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm">No items in this section yet.</p>
                                )}
                            </div>
                            
                        ))}
                        
                    </div>
                    
                </div>
                
            </div>
            
        );
    };

    export default CreativePreview;
