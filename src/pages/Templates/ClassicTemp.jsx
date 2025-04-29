import React from 'react'
import ClassicPreview from "../../components/Preview/ClassicPreview"
import ResumeForm from "../../components/ResumeForm"
const ClassicTemp = () => {
  return (
    <div className="flex gap-32 px-3 lg:px-10 py-20 lg:flex-row flex-col">
        <div className="lg:w-1/2 w-full">
        <ResumeForm />
        </div>
        <div>
        <ClassicPreview />
        </div>
    </div>
  )
}

export default ClassicTemp