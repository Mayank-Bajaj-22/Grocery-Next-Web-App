"use client"

import { ArrowLeft, EyeIcon, EyeOff, Leaf, Loader2, Lock, LogIn, Mail, User } from "lucide-react"
import { motion } from "motion/react";
import React, { useState } from "react";
import googleImage from "@/src/assets/google.png"
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type propType = {
    previousStep: (s: number) => void
}

export default function RegisterForm({ previousStep }: propType) {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleRegister = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await axios.post("/api/auth/register", {
                name, email, password
            })
            console.log(result.data)
            setLoading(false)
            setName("")
            setEmail("")
            setPassword("")
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative">
            <div 
                className="top-6 left-6 absolute flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors cursor-pointer"
                onClick={() => previousStep(1)}
            >
                <ArrowLeft className="w-5 h-5"/>
                <span className="font-medium">Back</span>
            </div>

            <motion.h1
                className="text-4xl font-extrabold text-green-700 mb-2"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                Create Account
            </motion.h1>

            <motion.p 
                className="flex items-center text-gray-600 mb-8"
                // initial={{ y: -10, opacity: 0 }}
                // animate={{ y: 0, opacity: 1 }}
                // transition={{ duration: 0.6 }}
            >
                Join Snapcart today <Leaf className="w-5 h-5 ml-1 text-green-400" />
            </motion.p>

            <motion.form
                onSubmit={handleRegister}
                className="flex flex-col gap-5 max-w-sm w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="relative">
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input type="text" placeholder="Enter Your Name" className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        onChange={(e) => setName(e.target.value)}
                        value={ name }
                    />
                </div>

                <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input type="email" placeholder="Enter Your Email" className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                        value={ email }
                    />
                </div>

                <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input placeholder="Enter Your Password" className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        onChange={(e) => setPassword(e.target.value)}
                        value={ password }
                        type={ showPassword ? "text" : "password"}
                    />
                    {
                        showPassword ? <EyeIcon className="absolute top-3.5 right-3.5 w-5 h-5 cursor-pointer text-green-600" onClick={() => setShowPassword(false)} /> : <EyeOff className="absolute top-3.5 right-3.5 w-5 h-5 cursor-pointer text-green-600" onClick={() => setShowPassword(true)} />
                    }
                </div>

                {
                    (() => {
                        const formValidation = name !== "" && email !== "" && password !== "" 
                        // formValidation it returns true ya false
                        return <button disabled={!formValidation || loading} className={`w-full font-semibold py-3 rounded-xl transition-all duration-200 shadow-md inline-flex items-center justify-center gap-2 ${ formValidation ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed" }`}>

                            {
                                loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Register"
                            }

                        </button>
                    })()
                }

                <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
                    <span className="flex-1 h-px bg-gray-200"></span>
                    OR
                    <span className="flex-1 h-px bg-gray-200"></span>
                </div>

                <div className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3 rounded-xl text-gray-700 font-medium transition-all duration-200 cursor-pointer" onClick={() => signIn("google", { callbackUrl: "/" })}>
                    <Image src={googleImage} width={20} height={20} alt="google" />
                    Continue with Google
                </div>
            </motion.form>

            <p className="text-gray-600 mt-6 text-sm flex items-center gap-1">
                Already have an account ? <LogIn className="w-5 h-5 cursor-pointer" /> <span className="text-green-700 font-semibold text-md cursor-pointer" onClick={() => router.push('/login')}>Sign In</span>
            </p>
        </div>
    )
}
