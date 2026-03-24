import mongoose from "mongoose";

const mongodbUrl = process.env.MONGODB_URL;

if (!mongodbUrl) {
    throw new Error("Please define the MONGODB_URL in environment variable: db error")
}

// har bar file change hone ya new API call pe backend dobara run hota hai, aur agar humne seedha mongoose.connect() likh diya to har baar ek naya database connection banega

// 2 case honge - ya toh connected hai ya connect ho raha hai

let cached = global.mongoose
if (!cached) {
    cached = global.mongoose={conn: null, promise: null}
}
// global.mongoose me kuch nhi hai jab hum conn or prmoise ko null kar denge

const connectDb = async () => {
    if (cached.conn) { // conn hai jab
        return cached.conn
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(mongodbUrl).then((conn) => conn.connection)
    }

    // Ek hi promise store kar rahe hain
    // Multiple requests aaye to same promise use ho

    // Connection pooling + promise reuse
    
    try {
        const conn = await cached.promise
        return conn
    } catch (error) {
        console.log("Promise resolve error in db")
        throw error
    }
}

export default connectDb;