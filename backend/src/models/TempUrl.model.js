import mongoose from "mongoose"

// Mongoose schema for miniUrl (URL shortening) (long url, short url, visits)
const TempUrlSchema = new mongoose.Schema(
  {
    longUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    creatorIp: {
      type: String,
      required: true,
    },
    lastVisited: {
      type: Date,
      required: false,
    },
  },
  { collection: "tempUrl" }
)

export const MiniUrl = mongoose.model("TempUrl", TempUrlSchema)
