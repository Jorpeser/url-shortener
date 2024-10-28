import mongoose from "mongoose"

// Mongoose schema for miniUrl (URL shortening) (long url, short url, visits)
const UserUrlSchema = new mongoose.Schema(
  {
    longUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
      required: false,
    },
    visits: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { collection: "userUrl" }
)

export const MiniUrl = mongoose.model("UserUrl", UserUrlSchema)
