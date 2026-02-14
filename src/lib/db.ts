import mongoose from "mongoose";

const mongodbUrl = process.env.MONOGODB_URL;

if (!mongodbUrl) {
    throw new Error("db error")
}

// har bar file change hone ya new API call pe backend dobara run hota hai, aur agar humne seedha mongoose.connect() likh diya to har baar ek naya database connection banega

let cached = global.mongoose
if (!cached) {
    cached = global.mongoose={conn: null, promise: null}
}

const connectDb = async () => {
    if (cached.conn) {
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
        
    }
}

export default connectDb;