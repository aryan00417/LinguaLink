import OpenAI from "openai";
import { StreamChat } from "stream-chat";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1", 
});

const streamClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET
);

export const handleStreamWebhook = async (req, res) => {
  try {
    const event = req.body;
    //Ignore bot's own messages (prevent infinite loop)
if (event.user?.id === "ai") {
  return res.status(200).json({ ok: true });
}

//Prevent duplicate replies using message ID
const messageId = event.message?.id;

if (!global.processedMessages) {
  global.processedMessages = new Set();
}

if (global.processedMessages.has(messageId)) {
  return res.status(200).json({ ok: true });
}

global.processedMessages.add(messageId);

    // Only listen to new messages
    if (event.type !== "message.new") {
      return res.status(200).json({ ok: true });
    }

    const messageText = event.message.text;
    const channelId = event.cid.split(":")[1];

    // Trigger only if bot mentioned
    if (!messageText.toLowerCase().includes("@ai")) {
      return res.status(200).json({ ok: true });
    }

    console.log("AI triggered in channel:", channelId);

    // Fetch last messages from Stream
    const channel = streamClient.channel("messaging", channelId);

    const state = await channel.query({
      messages: { limit: 20 },
    });

    const messagesForAI = state.messages.map((msg) => ({
      role: "user",
      content: msg.text,
    }));

    // System prompt (your AI personality)
    messagesForAI.unshift({
      role: "system",
      content:
        "You are LinguaLink AI assistant. You help users chat, translate and communicate better. Keep replies short, friendly and human-like.",
    });

    // 🔥 Ask OpenRouter (GPT model)
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: messagesForAI,
    });

    const aiReply = completion.choices[0].message.content;

    // Send reply as bot in Stream chat
    await channel.sendMessage({
      text: aiReply,
      user_id: "ai",
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("AI webhook error:", error);
    return res.status(500).json({ error: "Webhook failed" });
  }
};