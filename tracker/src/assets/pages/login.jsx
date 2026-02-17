import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

export default function Login(){
    const [username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const navigate = useNavigate();

    const handlelogin = async(e)=>{
        e.preventDefault();
        try{
            const res = await API.post("/user/signin",{username,password});
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard")
        }catch(err){
                alert("Invalid credentials")
        }
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
            
            <h2 className="text-2xl font-semibold text-center mb-6 text-slate-700">
            Welcome Back
            </h2>

            <form onSubmit={handlelogin} className="space-y-4">

            <div>
                <label className="text-sm text-slate-600">Username</label>
                <input
                type="text"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label className="text-sm text-slate-600">Password</label>
                <input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
                Login
            </button>

            </form>

        </div>
    </div>

    )


}