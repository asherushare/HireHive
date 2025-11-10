// import React, { useContext } from 'react'
// import { assets } from '../assets/assets'
// import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
// import { Link, useNavigate } from "react-router-dom";
// import { AppContext } from '../context/AppContext'; // Adjust the path if needed


// const Navbar = () => {

//     const {openSignIn} = useClerk()
//     const {user} = useUser()

//     const navigate = useNavigate()

//     const { setShowRecruiterLogin } = useContext(AppContext);

    

//   return (
//     <div className="shadow py-4">
//       <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
//         {/* <img src={assets.logo} alt="" /> */}
//         <h1 className='text-xl font-bold'><span className='text-blue-800'>H</span>ire<span className='text-blue-800'>H</span>ive</h1>
//         {user ? (
//           <div className='flex items-center gap-3'>
//             <Link to={'/applications'}>Applied Jobs</Link>
//             <p>|</p>
//             <p className='max-sm:hidden'>Hi, {user.firstName+" "+user.lastName}</p>
//             <UserButton />
//           </div>
//         ) : (
//           <div className="flex gap-4 max-sm:text-xs">
//             <button onClick={e=> setShowRecruiterLogin(true)} className="text-gray-600">Recruiter Login</button>
//             <button
//               onClick={(e) => openSignIn()}
//               className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full"
//             >
//               Login
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Navbar




import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { setShowRecruiterLogin } = useContext(AppContext);

  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        {/* ✅ Logo now redirects to Home */}
        <Link to="/">
          <h1 className="text-xl font-bold cursor-pointer">
            <span className="text-blue-800">H</span>ire
            <span className="text-blue-800">H</span>ive
          </h1>
        </Link>

        {user ? (
          <div className="flex items-center gap-3">
            <Link
              to="/applications"
              className="hover:text-blue-700 cursor-pointer"
            >
              Applied Jobs
            </Link>
            <p>|</p>
            <p className="max-sm:hidden">
              Hi, {user.firstName + " " + user.lastName}
            </p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-xs">
            <button
              onClick={() => setShowRecruiterLogin(true)}
              className="text-gray-600 hover:text-gray-800"
            >
              Recruiter Login
            </button>

            <button
              onClick={() => openSignIn()}
              className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
