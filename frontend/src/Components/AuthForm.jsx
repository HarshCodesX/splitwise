import React, { useState } from 'react';
import { loginUser, signupUser} from '../api/auth';
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: ""
    });
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const navigate = useNavigate();

    //handle the changes to alter email, username and password
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    //isLogin is true then login api will be called, else signup
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const res = await loginUser({ username: formData.username, password: formData.password });
                // console.log(res.status);
                if(res.status == 200 || res.status == 201){
                    setIsLoggedIn(true);
                    localStorage.setItem("isLoggedIn", true);
                    toast.success("Login successful!");
                    navigate("/create-group");
                }
            } else {
                const res = await signupUser(formData);
                if(res.status == 200 || res.status == 201){
                    setIsLoggedIn(true);
                    
                    localStorage.setItem("isLoggedIn", true);
                    toast.success("Signup successful!");
                    // console.log(res);
                    navigate("/create-group");
                }
            }
        } catch (error) {
            // console.log(error.message);
            toast.error(error.response?.data?.msg || "something went wrong here");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? "Login" : "Signup"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    )}
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        {isLogin ? "Login" : "Signup"}
                    </button>
                </form>
                <p className="mt-4 text-center">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-600 hover:underline"
                    >
                        {isLogin ? "Signup" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
