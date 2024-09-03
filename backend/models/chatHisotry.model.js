import mongoose from "mongoose";
import { chatHistorySchema } from "../database/db.schema.js";

const ChatHistoryModel = mongoose.model("ChatHistory", chatHistorySchema);

export default ChatHistoryModel;
