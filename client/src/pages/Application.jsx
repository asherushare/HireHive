import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { assets, jobsApplied } from '../assets/assets';
import moment from 'moment';
import Footer from '../components/Footer';
import { useAuth, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import { AppContext } from "../context/AppContext";
import axios from 'axios';


const Applications = () => {

  const {user} = useUser();
  const {getToken} = useAuth();

  const [isEdit, setIsEdit] = useState(false);
  // Using camelCase convention for state variables
  const [resume, setResume] = useState(null);

  const {backendUrl, userData, userApplications, fetchUserData, fetchUserApplications} = useContext(AppContext);

  const updateResume = async() => {
    try {
      const formData = new FormData();
      formData.append('resume', resume);

      const token = await getToken()

      const {data} = await axios.post(backendUrl+'/api/users/update-resume', formData, {
        headers: {Authorization: `Bearer ${token}`}
      })
      if(data.success) {
        toast.success(data.message);
        await fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setIsEdit(false);
    setResume(null);
  }

  useEffect(() => {
    if(user) {
      fetchUserApplications();
    }
  }, [user])

  return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        {/* Resume Section remains the same */}
        <h2 className='text-xl font-semibold'>Your Resume</h2>
        <div className='flex gap-2 mb-6 mt-3'>
          {
            isEdit || userData && userData.resume === ""
            ? <>
              <label className='flex items-center' htmlFor="resumeUpload">
                <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>{resume ? resume.name : "Select Resume"}</p>
                <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/pdf' type="file" hidden />
                <img src={assets.profile_upload_icon} alt="" />
              </label>
              <button onClick={updateResume} className='bg-green-100 border border-green-400 rounded-lg px-4 py-2'>Save</button>
            </>
            : <div className='flex gap-2'>
              <a href={userData.resume} target="_blank" rel="noreferrer" className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg' >
                Resume
              </a>
              <button  onClick={() => setIsEdit(true)} className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2'>
                Edit
              </button>
            </div>
          }
        </div>
        
        <h2 className='text-xl font-semibold mb-4'>Jobs Applied</h2>
        <table className='min-w-full bg-white border border-collapse rounded-lg'>
          <thead>
            {/* Table Header remains the same */}
            <tr>
              <th className='py-3 px-4 border-b text-left'>Company</th>
              <th className='py-3 px-4 border-b text-left'>Job Title</th>
              <th className='py-3 px-4 border-b text-left max-sm:hidden'>Location</th>
              <th className='py-3 px-4 border-b text-left max-sm:hidden'>Date</th>
              <th className='py-3 px-4 border-b text-left'>Status</th>
            </tr>
          </thead>
          <tbody>
            {userApplications.map((job, index) => (
              <tr key={index}>
                {/* FIX 1: Wrapped content in a div and moved flex classes to it */}
                <td className='py-3 px-4 border-b'>
                  <div className='flex items-center gap-2'>
                    <img className='w-8 h-8' src={job.companyId.image} alt="" />
                    {job.companyId.name}
                  </div>
                </td>
                {/* FIX 2: Made vertical padding consistent across all cells */}
                <td className='py-3 px-4 border-b'>{job.jobId.title}</td>
                <td className='py-3 px-4 border-b max-sm:hidden'>{job.jobId.location}</td>
                <td className='py-3 px-4 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
                <td className='py-3 px-4 border-b'>
                  <span className={`${job.status === 'Accepted' ? 'bg-green-100' : job.status === 'Rejected' ? 'bg-red-100' : 'bg-blue-100'} px-4 py-1.5 rounded `}>
                    {job.status}
                  </span>
                  
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  )
}

export default Applications;