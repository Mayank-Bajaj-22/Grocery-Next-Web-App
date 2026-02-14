import { Connection } from "mongoose"

declare global {
    var mongoose: {
        conn: Connection | null,
        promise: Promise<Connection> | null
    }
}

// Connection ko globally cache kar sake
// File reload hone pe bhi data survive kare

export {}