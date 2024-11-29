import mongoose from "mongoose"

export interface ITempUrl {
  longUrl: string
  shortUrl: string
  creatorIP: string
  lastVisited: Date
}

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
    creatorIP: {
      type: String,
      required: true,
    },
    lastVisited: {
      type: Date,
      required: true,
    },
  },
  { collection: "tempUrl" }
)

export const TempUrl = mongoose.models.TempUrl || mongoose.model<ITempUrl>("TempUrl", TempUrlSchema)