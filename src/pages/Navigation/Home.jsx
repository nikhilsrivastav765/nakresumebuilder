import React from 'react'
import { Link } from "react-router-dom";
import Marquees from '../../components/common/Marquees'


const Home = () => {
  return (
    <div>
    <div className="flex px-4 m-auto justify-between h-full flex-col py-20 lg:items-center lg:py-32 lg:px-24
    ">
<div className=" flex flex-col gap-5 lg:max-w-7xl lg:gap-8 lg:items-center">
<h1 className=" text-center leading-[1.3] tracking-normal font-bold lg:pb-8  lg:leading-[1.3] lg:font-medium text-5xl sm:text-5xl lg:text-9xl">Welcome to <span
    className="text-[#4F46E5] font-bold md:text-6xl text-5xl lg:text-9xl">NAK
    Resume Builder</span></h1>
<h1 className=" text-4xl lg:font-semibold tracking-tight lg:tracking-normal lg:leading-[1.2] lg:pb-8 text-center lg:text-6xl">We're here to help you craft a standout resume that gets you closer to your dream job.</h1>
<h3 className=" font-normal text-xl lg:pb-8 text-center lg:text-5xl">Let's start by choosing layout.</h3>
<div className="flex gap-5 justify-center">
  <button className=" bg-[#4F46E5] rounded-full text-white font-medium text-xs px-3 lg:text-lg lg:px-5 lg:py-3"><Link to="/layouts">Choose Layout</Link></button>
  <button className="py-3 px-5 rounded-full  border-[1px] lg:border-2 border-gray-500 text-xs lg:text-lg font-semibold"><Link to="/contact">Contact Us</Link></button>
</div>
</div>
</div>

    <Marquees />
    <div className="mx-auto flex w-full flex-col px-4  lg:w-full lg:flex-row pb-20">
    <div className="max-w-md pr-20 lg:pt-28">
      <img
        src="https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/601074ed0f05cd25097215a4_6002086f72b7277e1f01d682_ryan-morrison-illustration-1.png"
        alt="" />
    </div>
    <div className="">
      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
          stroke="currentColor" className="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
        </svg>
      </div>
      <h2 className="mb-10 max-w-lg text-4xl font-bold leading-snug lg:text-5xl lg:leading-snug">A <span
          className="text-indigo-600">revolutionary</span> way to build Resume</h2>
      <div className="grid gap-y-12 gap-x-8 lg:grid-cols-2">
        <div>
          <p className="mb-6 border-l-4 border-indigo-600 pl-4 text-2xl leading-10">Create resume in minutes</p>
          <p className="text-lg text-gray-800">Build a stunning, job-winning resume effortlessly in just a few minutes. Our smart tools ensure your resume looks polished, professional, and ready to impress.</p>
        </div>
        <div>
          <p className="mb-6 border-l-4 border-indigo-600 pl-4 text-2xl leading-10">Get Skill Suggestoins From Artificial Intelligence</p>
          <p className="text-lg text-gray-800">Not sure which skills to highlight? Let our AI guide you! Get smart, personalized skill suggestions that make your resume stand out to employers.</p>
        </div>
        <div>
          <p className="mb-6 border-l-4 border-indigo-600 pl-4 text-2xl leading-10">Choose different templates</p>
          <p className="text-lg text-gray-800">Pick from a variety of professionally designed templates to match your style and career goals. Build a resume that truly reflects you.</p>
        </div>
        <div>
          <p className="mb-6 border-l-4 border-indigo-600 pl-4 text-2xl leading-10">Download Your Resume in Few Seconds</p>
          <p className="text-lg text-gray-800">inished building your resume? Download it instantly in just a few seconds — polished, professional, and ready to impress.</p>
        </div>
      </div>
    </div>
  </div>
  

    </div>
  )
}

export default Home