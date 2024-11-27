'use client'
import React, { useState, useEffect } from "react";
import axios from "axios"



const Profile = () => {

    const [userData, setUserData] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/auth/profile",{ withCredentials : true});
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                // Optionally handle the error (e.g., set an error state)
            }
        };
    
        fetchData();
    }, []);
    return (
        <div>{userData}</div>
    );
}


export default Profile;
