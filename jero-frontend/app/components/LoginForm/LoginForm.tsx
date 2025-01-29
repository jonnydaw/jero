// components/Form.js
'use client'
import React, { useState } from "react";
import axios from "axios"

const LoginForm = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        
    });

    const handleChange = (e : any) => {
        const { name, value} = e.target;
            setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        try {
        const response = await axios.post('http://localhost:8080/auth/signin', {
            email : formData.email,
            password : formData.password

        },
        { withCredentials: true}
    );
        console.log(response.data);
        } catch (error : any) {
        console.log(formData)
        console.error('Login failed:', error.response ? error.response.data : error.message);
    }
}

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                 />
             <input
                type="text"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                 />

            <button type="submit">
                DElete
            </button>
        </form>
    );
    }


export default LoginForm;
