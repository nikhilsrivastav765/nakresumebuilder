import React, { useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import html2pdf from 'html2pdf.js';
import { MapPin, Phone, Mail, Linkedin, Github } from 'lucide-react'; // Import icons

const ModernPreview = () => {
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

    return (
        <div className="">
            <div className="w-full max-w-210mm mx-auto ">
                <div
                    ref={resumeRef}
                    className="bg-white shadow-lg rounded-lg px-6 py-8 w-full lg:w-[210mm] min-h-[297mm] border border-gray-300 font-['Arial'] text-sm break-words leading-relaxed"
                >
                    {}
                    <div className="flex flex-col mb-6 bg-blue-900 rounded-tr-md rounded-tl-md py-5 px-3 ">
                        <h1 className="text-3xl font-bold text-white inline-block">{resumeData.personalInfo.fullName || 'Your Name'}</h1>
                        <p className="text-lg text-gray-200">{resumeData.personalInfo.professionalTitle || 'Professional Title'}</p>
                        <div className="flex flex-wrap gap-4 text-gray-300 text-sm mt-5">
                            <div className="flex items-center gap-2">
                                
                                <span>{resumeData.personalInfo.phone || 'Phone'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                
                                <span>{resumeData.personalInfo.email || 'Email'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                
                                <span>{resumeData.personalInfo.address || 'City, State'}</span>
                            </div>
                            {resumeData.personalInfo.linkedin && (
                                <div className="flex items-center gap-2">
                                    
                                    <span>{resumeData.personalInfo.linkedin}</span>
                                </div>
                            )}
                            {resumeData.personalInfo.github && (
                                <div className="flex items-center gap-2">
                                   
                                    <span>{resumeData.personalInfo.github}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-[#084291] mb-3 flex items-center gap-2 border-b-2 border-[#084291] pb-2">
                            Professional Summary
                        </h2>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm pt-1">
                            {resumeData.summary ||
                                "Use this area for your elevator pitch to promote your awesome skills and achievements..."
                            }
                        </p>
                    </div>

                    {}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-[#084291] mb-4 flex items-center gap-2 border-b-2 border-[#084291] pb-2">
                            Experience
                        </h2>
                        {resumeData.experience.length > 0 ? (
                            resumeData.experience.map((exp, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex justify-between items-start gap-2 flex-col">
                                        <h3 className="text-lg font-semibold text-gray-800">{exp.position || 'Job Position'} / <span className='text-[#084291]'>{exp.company || 'Company'}</span></h3>
                                        <p className="text-gray-600 text-sm">
                                            {exp.startDate && exp.endDate
                                                ? `${exp.startDate} - ${exp.endDate}`
                                                : 'Start Date - End Date'}
                                        </p>
                                    </div>
                                    <p className="text-gray-600 text-sm">{exp.location || 'Location'}</p>
                                    <p className="text-gray-700 leading-relaxed mt-2 whitespace-pre-line text-sm">{exp.description ||
                                        "In a few lines, summarize your main responsibilities..."
                                    }</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No experience added yet.</p>
                        )}
                    </div>

                    {}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-[#084291] mb-4 flex items-center gap-2 border-b-2 border-[#084291] pb-2">
                            Education
                        </h2>
                        {resumeData.education.length > 0 ? (
                            resumeData.education.map((edu, index) => (
                                <div key={index} className="mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{edu.degree || 'Degree'} / <span className='text-[#084291]'>{edu.field || 'Major'}</span></h3>
                                    <p className="text-gray-600 text-sm">{edu.institution || 'University Name'}, {edu.location || 'Location'}</p>
                                    <p className="text-gray-600 text-sm">
                                        {edu.startYear && edu.endYear
                                            ? `${edu.startYear} - ${edu.endYear}`
                                            : 'Start Year - End Year'}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No education added yet.</p>
                        )}
                    </div>

                    {}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-[#084291] mb-4 flex items-center gap-2 border-b-2 border-[#084291] pb-2">
                            Certifications
                        </h2>
                        {resumeData.certificates.length > 0 ? (
                            resumeData.certificates.map((cert, index) => (
                                <div key={index} className="mb-4">
                                    <h3 className="text-md font-semibold text-gray-800">{cert.name || 'Certification Name'}</h3>
                                    <p className="text-gray-600 text-sm">{cert.issuer || 'Organization Name'}, {cert.date || 'Year'}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No certifications added yet.</p>
                        )}
                    </div>

                    {}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-[#084291] mb-4 flex items-center gap-2 border-b-2 border-[#084291] pb-2">
                            Skills
                        </h2>
                        {resumeData.skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2"> {}
                                {resumeData.skills.map((skill, index) => (
                                    <div key={index} className="bg-gray-200 px-2 py-1 rounded-md text-gray-700 text-sm mr-2 mb-2"> {}
                                        {skill.name}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">No skills added yet.</p>
                        )}
                    </div>
                </div>
            </div>

            {}
            <div className="fixed right-5 bottom-5 z-50">
                <button
                    onClick={handleDownload}
                    className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition duration-300"
                >
                    Download as PDF
                </button>
            </div>
        </div>
    );
};

export default ModernPreview;
