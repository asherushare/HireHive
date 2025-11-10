import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { companyData, setCompanyData, setCompanyToken, companyToken } =
    useContext(AppContext);

  const logout = () => {
    setCompanyData(null);
    localStorage.removeItem("companyToken");
    setCompanyToken(null);
    navigate("/");
  };

  useEffect(() => {
    if (!companyToken && !companyData) {
      navigate("/");
      return;
    }
    
    // If on /dashboard exactly, redirect to manage-jobs
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/manage-jobs", { replace: true });
    }
  }, [companyData, companyToken, navigate, location.pathname]);

  return (
    <div>
      {/* Navbar for recruiter panel */}
      <div className="shadow py-4">
        <div className="px-5 flex justify-between items-center">
          {/* ✅ Clickable Logo - Goes to Public Landing Page so Recruiters can verify their jobs */}
          <Link to="/">
            <h1 className="text-xl font-bold cursor-pointer">
              <span className="text-blue-800">H</span>ire
              <span className="text-blue-800">H</span>ive
            </h1>
          </Link>

          {companyData ? (
            <div className="flex items-center gap-3">
              <p className="max-sm:hidden">Welcome, {companyData.name}</p>
              <div className="relative group">
                <img
                  className="w-8 border rounded-full"
                  src={companyData.image}
                  alt=""
                />
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                  <ul
                    onClick={logout}
                    className="list-none m-0 p-2 bg-white rounded-md border text-sm"
                  >
                    <li className="py-1 px-2 cursor-pointer pr-10">Logout</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <p className="text-gray-500">Loading...</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start">
        {/* Sidebar */}
        <div className="inline-block min-h-screen border-r-2 border-gray-300">
          <ul className="flex flex-col items-start pt-5 text-gray-800">
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500"
                }`
              }
              to={"/dashboard/add-job"}
            >
              <img className="min-w-4" src={assets.add_icon} alt="" />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500"
                }`
              }
              to={"/dashboard/manage-jobs"}
            >
              <img className="min-w-4" src={assets.home_icon} alt="" />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500"
                }`
              }
              to={"/dashboard/view-applications"}
            >
              <img className="min-w-4" src={assets.person_tick_icon} alt="" />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>

        <div className="flex-1 h-full p-2 sm:p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
