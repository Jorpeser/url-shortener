import mongoose from "mongoose"

// Mongoose schema for miniUrl (URL shortening) (long url, short url, visits)
const Blacklist = new mongoose.Schema(
  {
    ipAddress: {
      type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
  },
  { collection: "blacklist" }
)

export const MiniUrl = mongoose.model("Blacklist", Blacklist)
