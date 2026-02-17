import React from "react";
import API from "../../api/axios";
import { useState,useEffect } from "react";
import AddHabits from "../components/Addhabits";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){
    const [habits,setHabits]=useState([]);
    useEffect(()=>{
        fetchHabits();
    },[]);

    const fetchHabits = async()=>{
        try{
            const res = await API.get("/habit/all");
            setHabits(res.data);
        }catch(err){
            console.error("Error fetchong habits",err);
        }
    };
    const Navigate = useNavigate();
    const handleComplete = async(id)=>{
        try{
            await API.put(`/habit/completed/${id}`);
            fetchHabits();
        }catch(err){
            console.log(err);
        }
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this habit?");
        if (!confirmDelete) return;

        try {
            await API.delete(`/habit/delete/${id}`);
            fetchHabits();
        } catch (err) {
            alert(err.response?.data?.message || "Delete failed");
        }
    };


    return (
    <div className="border-4 rounded bg-pink-400 w-max mx-auto">
        <div className="flex justify-center">
            <h2 className="text-5xl text-blue-600 text-center">Your Habits</h2>
            <button onClick={()=>{Navigate("/login")}} className="border-2 rounded bg-indigo-700 w-xs m-2">Logout</button>
        </div>

        <div className="add-section">
        <AddHabits refreshHabits={fetchHabits} />
        </div>

        <div className="habit-list">
        {habits.length === 0 ? (
            <p className="empty">No habits yet. Add one 🚀</p>
        ) : (
            habits.map((h) => (
            <div key={h._id} className="border-2 bg-indigo-700 rounded w-3xl mx-auto m-2">
                <div>
                    <div className="flex justify-center">
                        <h3 className="text-3xl">{h.habit}</h3>
                        <button type="submit" onClick={()=>handleComplete(h._id)} className="p-1 border-2 rounded m-1 bg-gray-500 ml-4">Complete</button>
                        <button type="submit" onClick={()=>handleDelete(h._id)} className="p-1 border-2 rounded m-1 bg-gray-500 ml-4">Delete</button>
                    </div>
                <p className="streak text-2xl self-center align-middle text-center">🔥 Streak: {h.streak}</p>
                </div>
            </div>
            ))
        )}
        </div>
    </div>
);

}