  import React from 'react'
  import ModernPreview from "../../components/Preview/ModernPreview"
  import ResumeForm from "../../components/ResumeForm"
  const ModernTemp = () => {
    return (
      <div className="flex gap-32 px-3 lg:px-10 py-20 lg:flex-row flex-col">
          <div className="lg:w-1/2 w-full">
          <ResumeForm />
          </div>
          <div>
          <ModernPreview />
          </div>
      </div>
    )
  }

  export default ModernTemp