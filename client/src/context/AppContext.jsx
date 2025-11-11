import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const {user} = useUser();
    const {getToken} = useAuth();

    const [searchFilter, setSearchFilter] = useState({
        title: "",
        location: ""
    });

    const [isSearched, setIsSearched] = useState(false);

    const [jobs, setJobs] = useState([]);

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

    const [companyToken, setCompanyToken] = useState(null)
    const [companyData, setCompanyData] = useState(null)

    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState([])

    // Function to fetch jobs
    const fetchJobs = async () => {
        try{

            const {data} = await axios.get(backendUrl+'/api/jobs')

            if(data.success){
                setJobs(data.jobs)
            } else{
                toast.error(data.message)
            }

        } catch(error) {
            toast.error(error?.response?.data?.message || error.message || 'Failed to fetch jobs')
        }
       
    }

    // Function to fetch company data

    const fetchCompanyData = async() => {
        try{
            const {data} = await axios.get(backendUrl+'/api/company/company', {headers: 
                {token: companyToken}
            })

            if(data.success) {
                setCompanyData(data.company)
            } else{
                toast.error(data.message)
            }
        } catch(error){
            toast.error(error?.response?.data?.message || error.message || 'Failed to fetch company data')
        }
    }

    // Function to fetch user data
    const fetchUserData = async() => {
        try {
            const token = await getToken();

            if (!token) {
                console.log('No token available');
                return;
            }

            const {data} = await axios.get(backendUrl+'/api/users/user', {headers:
                {Authorization: `Bearer ${token}`}
            })

            if(data.success) {
                setUserData(data.user)
            }else {
                // User not found - likely webhook issue
                if (data.message && data.message.includes('User Not Found')) {
                    console.error('User not found in database. This may be a webhook configuration issue.');
                    // Don't show error toast, just log it - user might have just registered
                } else {
                    toast.error(data.message);
                }
                setUserData(null);
            }
        } catch(error) {
            console.error('Error fetching user data:', error);
            // Don't show error if it's a 401 (not authenticated) - that's expected for logged out users
            if (error?.response?.status !== 401) {
                toast.error(error?.response?.data?.message || error.message || 'Failed to fetch user data');
            }
            setUserData(null);
        }
    }

    // Function to fetch user's applied applications data

    const fetchUserApplications = async() => {
        try {
            const token = await getToken();

            const {data} = await axios.get(backendUrl+'/api/users/applications', {headers:
                {Authorization: `Bearer ${token}`}
            })

            if(data.success) {
                setUserApplications(data.applications)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || 'Failed to fetch applications')
        }
    }

    useEffect(() => {
        fetchJobs();
        const storedCompanyToken = localStorage.getItem('companyToken');

        if(storedCompanyToken) {
            setCompanyToken(storedCompanyToken);
        }
    }, []);

    useEffect(() => {
        if(companyToken){
            fetchCompanyData()
        }

    }, [companyToken])

    useEffect(() => {
        if(user){
            fetchUserData()
            fetchUserApplications()
        }
    }, [user])

    const value = {
        searchFilter,
        setSearchFilter,
        isSearched,
        setIsSearched,
        jobs,
        setJobs,
        showRecruiterLogin, setShowRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        backendUrl,
        userData, setUserData,
        userApplications, setUserApplications,
        fetchUserData,
        fetchUserApplications,
    }

    return (<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}