import React, { useState } from 'react';
import BasicInfo from './Form/PersonalInfo';
import Education from './Form/Education';
import Experience from './Form/Experience';
import Skills from './Form/Skills';
import Summary from './Form/Summary';

const ResumeForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Your form data states here (example)
  const [basicInfo, setBasicInfo] = useState({});
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [summary, setSummary] = useState('');

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {}
      <div className="mb-6 flex justify-between">
        {['Basic Info', 'Education', 'Experience', 'Skills', 'Summary'].map((label, index) => (
          <div key={index} className={`flex-1 text-center ${currentStep === index + 1 ? 'font-bold' : ''}`}>
            {label}
          </div>
        ))}
      </div>

      {}
      {currentStep === 1 && (
        <BasicInfo
          basicInfo={basicInfo}
          setBasicInfo={setBasicInfo}
        />
      )}
      {currentStep === 2 && (
        <Education
          education={education}
          setEducation={setEducation}
        />
      )}
      {currentStep === 3 && (
        <Experience
          experience={experience}
          setExperience={setExperience}
        />
      )}
      {currentStep === 4 && (
        <Skills
          skills={skills}
          setSkills={setSkills}
        />
      )}
      {currentStep === 5 && (
        <Summary
          summary={summary}
          setSummary={setSummary}
        />
      )}

      {}
      <div className="mt-6 flex justify-between">
        {currentStep > 1 && (
          <button
            onClick={prevStep}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            Previous
          </button>
        )}
        {currentStep < 5 && (
          <button
            onClick={nextStep}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Next
          </button>
        )}
        
      </div>
    </div>
  );
};

export default ResumeForm;
