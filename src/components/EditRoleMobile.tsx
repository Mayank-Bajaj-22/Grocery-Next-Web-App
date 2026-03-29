"use client"

import axios from "axios"
import { ArrowRight, Bike, User, UserCog } from "lucide-react"
import { motion } from "motion/react"
import { redirect } from "next/navigation";
import { useState } from "react"

export default function EditRoleMobile() {
    // id = jo backend ke user model me hai vo exact name
    // label = jo frontend me dikhana chahte hai vo
    const [roles, setRoles] = useState([
        { id: "admin", label: "Admin", icon: UserCog },
        { id: "user", label: "User", icon: User },
        { id: "deliveryBoy", label: "Delivery Boy", icon: Bike },
    ])

    const [selectedRole, setSelectedRole] = useState("");
    const [mobile, setMobile] = useState("");

    const handleEdit = async () => {
        try {
            const result = await axios.post("/api/user/edit-role-mobile", {
                role: selectedRole,
                mobile
            })
            console.log(result.data)
            redirect("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="edit-role-container items-center">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="edit-role-title"
            > 
                Select Your Role
            </motion.h1>

            <div className="roles-wrapper">
                {
                    roles.map((role) => {
                        const Icon = role.icon; 
                        const isSelected = selectedRole == role.id;
                        return (
                            <motion.div
                                whileTap={{ scale: 0.94 }}
                                onClick={() => setSelectedRole(role.id)}
                                key={role.id}
                                className={`role-card ${isSelected ? "selected" : ""}`}
                            >
                                <Icon />
                                <span>{role.label}</span>
                            </motion.div>
                        )
                    })
                }
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col items-center mt-10"
            >
                <label htmlFor="mobile" className="text-gray-700 font-medium mb-2">Enter Your Mobile No.</label>
                <input 
                    type="tel" 
                    id="mobile" 
                    className="w-64 md:w-80 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-800" placeholder="eg. 7894561230"
                    onChange={(e) => setMobile(e.target.value)}
                    value={mobile}
                />
            </motion.div> 

            <motion.button
                disabled={ mobile.length !== 10 || !selectedRole }
                initial={{ opacity: 0, y: +20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className={`inline-flex items-center gap-2 font-semibold px-8 py-3 rounded-2xl shadow-md transition-all duration-200 w-50 mt-5 ${selectedRole && mobile.length === 10 ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed" }`}
                onClick={handleEdit}
            >
                Go To Home <ArrowRight />
            </motion.button>
        </div>
    )
}
