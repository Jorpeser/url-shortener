import mongoose from "mongoose"

export interface IBlacklist {
  ipAddress: string
  user: mongoose.Schema.Types.ObjectId
}

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

export const MiniUrl = mongoose.models.Blacklist || mongoose.model<IBlacklist>("Blacklist", Blacklist)
