import express from "express";
import connectToMongoDB from "./connect.js";
import urlRoute from "./routes/url.js";
import URL from "./models/url.js"
import "dotenv/config";
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 8001;
const url = process.env.MONGODB_URL;

connectToMongoDB(url).then(
    () => console.log("MongoDB connected")
)

app.use(cors())
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

    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.redirectURL);    
});     


app.listen(PORT, () => console.log(`Server running at PORT: ${PORT}`));
