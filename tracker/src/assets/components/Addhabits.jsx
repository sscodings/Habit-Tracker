import React from "react";
import API from "../../api/axios";
import { useState,useEffect } from "react";

export default function AddHabits({refreshHabits}){
    const [title,setTitle] = useState("");

    const addHabit = async(e)=>{
        e.preventDefault();

        try{
            await API.post("/habit/add",{habit:title});
            setTitle("");
            refreshHabits();
        }catch(err){
            alert("Add a habit")
        }
    }
    return(
        <div className="flex justify-center items-center p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
                <form onSubmit={addHabit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wide ml-1">
                            New Habit
                        </label>
                        <div className="relative group">
                            <input 
                                type="text" 
                                placeholder="e.g. Read for 30 mins" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all duration-200 placeholder:text-slate-400"
                            />
                            {}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-100 active:scale-[0.98] transition-all duration-150"
                    >
                        Start Habit
                    </button>
                </form>
            </div>
        </div>
    )
}