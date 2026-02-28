import mongoose from "mongoose";

interface IUser {
    _id?: mongoose.Types.ObjectId,
    name: string,
    email: string,
    password?: string,
    mobile?: string,
    role: "user" | "deliveryBoy" | "admin",
    image?: string
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    mobile: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: ["user", "deliveryBoy", "admin"],
        default: "user"
    },
    image: {
        type: String
    }
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model("User", userSchema)

// above line reason - next js me isliye aati hai kyunki Next.js ka backend part har request ya code change ke time automatically reload ho jata hai. 
// Hot Reloading hoti hai
// Server har request par reload ho sakta hai
// File multiple baar execute ho sakti hai

// object ka type hum interface ya type ka use karke banate hai

export default User;