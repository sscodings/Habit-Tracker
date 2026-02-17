import React from "react";
import API from "../../api/axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Signup(){
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword]=useState("");

    const navigate = useNavigate();

    const handleSignup = async(e)=>{
        e.preventDefault();

        try{
            await API.post("/user/signup",{firstname,lastname,username,password});
            alert("account created successfully! Please Login");
            navigate("/login");
        }catch(err){
            alert("User already exists or invalid credentials");
        };

    }
    return(
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-slate-200">
            
            <h2 className="text-3xl font-bold text-center mb-2 text-slate-800">
                Create Account
            </h2>
            <p className="text-center text-slate-500 mb-8 text-sm">
                Join us to start tracking your habits today!
            </p>

            <form onSubmit={handleSignup} className="space-y-5">
                {}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                            First Name
                        </label>
                        <input 
                            type="text" 
                            placeholder="Enter First name" 
                            onChange={(e) => setFirstname(e.target.value)} 
                            className="w-full mt-1 px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                            Last Name
                        </label>
                        <input 
                            type="text" 
                            placeholder="enter lastname" 
                            onChange={(e) => setLastname(e.target.value)} 
                            className="w-full mt-1 px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                        Username
                    </label>
                    <input 
                        type="text" 
                        placeholder="Enter username" 
                        onChange={(e) => setUsername(e.target.value)} 
                        className="w-full mt-1 px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                        Password
                    </label>
                    <input 
                        type="password" 
                        placeholder="Enter Password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full mt-1 px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-[0.98] transition-all"
                >
                    Sign Up
                </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-bold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    </div>
    )

}