import dotenv from "dotenv"
dotenv.config()
const config = {
    PORT: process.env.PORT || 5000,
    MONGOBD_URL: process.env.MONGOBD_URL || "mongodb://localhost:27017/ecommerce"
}

export default config