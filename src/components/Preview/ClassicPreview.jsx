import React, { useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import html2pdf from 'html2pdf.js';

const ClassicPreview = () => {
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
        <div className="">
            <div className="w-full">
                <div
                    ref={resumeRef}
                    className="bg-white shadow-lg rounded-lg px-6 py-8 w-full lg:w-[210mm] min-h-[297mm] border border-gray-800 font-['Arial'] text-sm break-words leading-relaxed"
                >
                    {}
                    <div className="flex flex-col mb-6 bg-black rounded-tr-md rounded-tl-md py-5 px-3 ">
                        <h1 className="text-3xl font-bold text-white inline-block">{resumeData.personalInfo.fullName || 'Your Name'}</h1>
                        <p className="text-lg text-gray-200">{resumeData.personalInfo.professionalTitle || 'Professional Title'}</p>
                        <div className="flex flex-wrap gap-4 text-gray-300 text-sm mt-4">
                            <div>
                                <span>{resumeData.personalInfo.phone || 'Phone'}</span>
                            </div>
                            <div>
                                <span>{resumeData.personalInfo.email || 'Email'}</span>
                            </div>
                            <div>
                                <span>{resumeData.personalInfo.address || 'City, State'}</span>
                            </div>
                            {resumeData.personalInfo.linkedin && (
                                <div>
                                    <span>{resumeData.personalInfo.linkedin}</span>
                                </div>
                            )}
                            {resumeData.personalInfo.github && (
                                <div>
                                    <span>{resumeData.personalInfo.github}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold black mb-3  border-b-2 border-black pb-3">
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
                        <h2 className="text-xl font-semibold text-black mb-4  border-b-2 border-black pb-3">
                            Experience
                        </h2>
                        {resumeData.experience.length > 0 ? (
                            resumeData.experience.map((exp, index) => (
                                <div key={index} className="mb-4 pb-2 border-b border-gray-200 last:border-none">
                                    <div className="flex justify-between items-start  gap-2 flex-col  ">
                                        <h3 className="text-lg font-semibold text-gray-600">{exp.position || 'Job Position'} / <span className='text-black'>{exp.company || 'Company'}</span></h3>
                                        <p className="text-gray-600 text-sm">
                                            {formatDateRange(exp.startDate, exp.endDate)}
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
                        <h2 className="text-xl font-semibold text-black mb-4  border-b-2 border-black pb-3">
                            Education
                        </h2>
                        {resumeData.education.length > 0 ? (
                            resumeData.education.map((edu, index) => (
                                <div key={index} className="mb-4 pb-2 border-b border-gray-200 last:border-none">
                                    <h3 className="text-lg font-semibold text-gray-800">{edu.degree || 'Degree'}  <span className='text-black'>{edu.field }</span></h3>
                                    <p className="text-gray-600 text-sm">{edu.institution || 'University Name'}, {edu.location || 'Location'}</p>
                                    <p className="text-gray-600 text-sm">
                                        {formatDateRange(edu.startYear, edu.endYear)}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No education added yet.</p>
                        )}
                    </div>

                    {}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-black mb-4  border-b-2 border-black pb-3">
                            Certifications
                        </h2>
                        {resumeData.certificates.length > 0 ? (
                            resumeData.certificates.map((cert, index) => (
                                <div key={index} className="mb-4 pb-2 border-b border-gray-200 last:border-none">
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
                        <h2 className="text-xl font-semibold text-black mb-4  border-b-2 border-black pb-3">
                            Skills
                        </h2>
                        {resumeData.skills.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {resumeData.skills.map((skill, index) => (
                                    <div key={index} className="flex flex-col ">
                                        <span className="text-gray-700 text-sm">{skill.name || `Skill ${index + 1}`}</span>
                                        {}
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

export default ClassicPreview;