import { Router } from "express";
import AppointmentModel from "../models/appointment.model.js";
import ChatHistoryModel from "../models/chatHisotry.model.js";

const router = Router();
router.post("/create/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { messages } = req.body;

    console.log("appid", id);
    console.log("Received messages for saving to chat history:", messages);

    let chatHistory = await ChatHistoryModel.findOne({ appointmentId: id });

    if (!chatHistory) {
      // Create new chat history if not found
      chatHistory = new ChatHistoryModel({
        appointmentId: id,
        messages: [],
      });
      console.log("Creating new chat history");
    } else {
      console.log("Updating existing chat history");
    }

    // Ensure messages is an array
    const newMessages = Array.isArray(messages) ? messages : [messages];

    // Add all new messages to the chat history
    newMessages.forEach((msg) => {
      chatHistory.messages.push({
        text: msg.messages[0].text || msg.text,
        sender: msg.messages[0].sender || msg.sender,
      });
    });

    // Save the updated or new chat history
    await chatHistory.save();

    console.log("Chat history saved successfully");
    res.status(200).json(chatHistory);
  } catch (error) {
    console.error("Error saving chat history:", error);
    res.status(400).json({ message: "Invalid request", error: error.message });
  }
});

export { router as chatHistoryRouter };
