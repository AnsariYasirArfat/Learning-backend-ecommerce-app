import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";

(async () => {
    try {
        await mongoose.connect(config.MONGOBD_URL);
        console.log("DB CONNECTED !")

        app.on('error', (error) => {
            console.error("ERROR: ", error)
            throw error
        })
            const onListening = () => {
                console.log(`Listening on port ${config.PORT}`)
            }
            app.listen(config.PORT, onListening)
    } catch (error) {
        console.error("ERROR: ", error)
        throw error
    }
})()
