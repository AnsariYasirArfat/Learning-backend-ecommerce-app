import dotenv from "dotenv"
dotenv.config()
const config = {
    PORT: process.env.PORT || 5000,
    MONGOBD_URL: process.env.MONGOBD_URL || "mongodb://localhost:27017/ecommerce",
    JWT_SECRET: process.env.JWT_SECRET || "yoursecret",
    JWT_EXPIRY: process.env.JWT_EXPIRY || "30d"
}

export default config