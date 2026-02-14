import connectDb from "@/src/lib/db";
import User from "@/src/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        await connectDb()
        const { name, email, password } = await req.json();

        if ([name, email, password].some((field) => field?.trim() === "")) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            )
        }

        const existedUser = await User.findOne({ email })
        if (existedUser) {
            return NextResponse.json(
                { message: "email already exist!" },
                { status: 400 }
            )
        }

        if (password.length < 6) {
            return NextResponse.json(
                { message: "password must be at least 6 characters" },
                { status: 400 }
            )
        } 

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name, 
            email,
            password: hashedPassword
        })

        return NextResponse.json(
            user,
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: "register error ${error}" },
            { status: 500 }
        )
    }
}

// connectDB
// name, email, password frontend
// empty field check
// email check
// password 6 character
// password hash
// user create