import mongoose from "mongoose"

export interface IUserUrl {
  longUrl: string
  shortUrl: string
  alias?: string
  visits: number
}

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

export const UserUrl = mongoose.models.UserUrl || mongoose.model<IUserUrl>("UserUrl", UserUrlSchema)
