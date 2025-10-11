import React from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'

const ViewApplications = () => {
  return (
    <div className='container mx-auto p-4'>
      <div>
        {/* ✅ 1️⃣ Keep only soft outer border, enable border-collapse */}
        <table className='w-full max-w-4xl bg-white border border-gray-200 border-collapse max-sm:text-sm'>
          <thead>
            <tr>
              <th className='py-2 px-4 text-left'>#</th>
              <th className='py-2 px-4 text-left'>User name</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>Location</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>Job Title</th>
              <th className='py-2 px-4 text-left'>Resume</th>
              <th className='py-2 px-4 text-left'>Action</th>
            </tr>
          </thead>

          <tbody>
            {viewApplicationsPageData.map((applicant, index) => (
              // ✅ 2️⃣ Only row divider, no per-cell borders
              <tr key={index} className='text-gray-700 border-t border-gray-200'>
                <td className='py-2 px-4 text-center'>{index + 1}</td>
                <td className='py-2 px-4 text-center flex'>
                  <img
                    className='w-10 h-10 rounded-full mr-3 max-sm:hidden'
                    src={applicant.imgSrc}
                    alt=''
                  />
                  <span>{applicant.name}</span>
                </td>
                <td className='py-2 px-4 max-sm:hidden'>{applicant.jobTitle}</td>
                <td className='py-2 px-4 max-sm:hidden'>{applicant.location}</td>
                <td className='py-2 px-4'>
                  <a
                    href=''
                    target='_blank'
                    className='bg-blue-50 text-blue-400 py-1 rounded inline-flex gap-2 items-center'
                  >
                    Resume <img src={assets.resume_download_icon} alt='' />
                  </a>
                </td>
                <td className='py-2 px-4 relative'>
                  <div className='relative inline-block text-left group'>
                    <button className='text-gray-500 action-button'>...</button>
                    <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 border border-gray-200 rounded shadow group-hover:block'>
                      <button className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100'>
                        Accept
                      </button>
                      <button className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100'>
                        Rejected
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewApplications
