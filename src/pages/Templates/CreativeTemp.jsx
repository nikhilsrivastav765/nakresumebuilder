import React from 'react';
import CreativePreview from "../../components/Preview/CreativePreview";
import ResumeForm from "../../components/ResumeForm";

const CreativeTemp = () => {
  
  return (
    <div className="flex gap-32 lg:px-10 px-3 py-20 lg:flex-row flex-col">
      <div className="lg:w-1/2">
        <ResumeForm  /> 
      </div>
      <div>
        <CreativePreview />
      </div>
    </div>
  );
};


export default CreativeTemp;
