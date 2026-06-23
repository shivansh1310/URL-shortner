import express from "express";
import connectToMongoDB from "./connect.js";
import urlRoute from "./routes/url.js";
import URL from "./models/url.js"
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8001;
const url = process.env.MONGODB_URL;

connectToMongoDB(url).then(
    () => console.log("MongoDB connected")
)

app.use(express.json());

app.use("/url", urlRoute)
app.get("/:shortId", async (req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                },
            }
        }
    );
    res.redirect(entry.redirectURL);    
});     


app.listen(PORT, () => console.log(`Server running at PORT: ${PORT}`));
