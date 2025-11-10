import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Loading from "../components/Loading";

const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext);

  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Applicants
  const fetchCompanyJobApplications = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/company/applicants`, {
        headers: { token: companyToken },
      });

      if (data.success) {
        setApplicants((data.applications || []).reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update Application Status
  const updateApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-status`,
        { id, status },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success("Status updated");
        fetchCompanyJobApplications(); // refresh list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (companyToken) fetchCompanyJobApplications();
  }, [companyToken]);

  // Loading state
  if (loading) return <Loading />;

  // No applicants state
  if (!loading && applicants.length === 0) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl sm:text-2xl">No Job Applications Found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <table className="w-full max-w-4xl bg-white border border-gray-200 border-collapse max-sm:text-sm">
        <thead>
          <tr>
            <th className="py-2 px-4 text-left">#</th>
            <th className="py-2 px-4 text-left">User Name</th>
            <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
            <th className="py-2 px-4 text-left max-sm:hidden">Job Title</th>
            <th className="py-2 px-4 text-left">Resume</th>
            <th className="py-2 px-4 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {applicants
            .filter((item) => item.jobId && item.userId)
            .map((applicant, index) => (
              <tr
                key={index}
                className="text-gray-700 border-t border-gray-200"
              >
                <td className="py-2 px-4 text-center">{index + 1}</td>

                <td className="py-2 px-4 flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full max-sm:hidden"
                    src={applicant.userId.image}
                    alt=""
                  />
                  <span>{applicant.userId.name}</span>
                </td>

                <td className="py-2 px-4 max-sm:hidden">
                  {applicant.jobId.location}
                </td>
                <td className="py-2 px-4 max-sm:hidden">
                  {applicant.jobId.title}
                </td>

                <td className="py-2 px-4">
                  <a
                    href={applicant.userId.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-50 text-blue-500 px-3 py-1 rounded inline-flex gap-2 items-center hover:bg-blue-100"
                  >
                    Resume <img src={assets.resume_download_icon} alt="" />
                  </a>
                </td>

                <td className="py-2 px-4">
                  {applicant.status === "Pending" ? (
                    <div className="relative inline-block group">
                      <button className="text-gray-500">...</button>
                      <div className="hidden group-hover:block absolute right-0 top-5 bg-white border shadow rounded">
                        <button
                          onClick={() =>
                            updateApplicationStatus(applicant._id, "Accepted")
                          }
                          className="block w-full px-4 py-2 text-blue-600 hover:bg-gray-100"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            updateApplicationStatus(applicant._id, "Rejected")
                          }
                          className="block w-full px-4 py-2 text-red-600 hover:bg-gray-100"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span
                      className={
                        applicant.status === "Accepted"
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {applicant.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewApplications;
