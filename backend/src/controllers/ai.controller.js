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

    // 🚨 Ignore bot's own messages (prevent loop)
    if (event.user?.id === "ai") {
      return res.status(200).json({ ok: true });
    }

    // 🚨 Prevent duplicate replies
    const messageId = event.message?.id;
    if (!global.processedMessages) global.processedMessages = new Set();
    if (global.processedMessages.has(messageId)) {
      return res.status(200).json({ ok: true });
    }
    global.processedMessages.add(messageId);

    // Only listen to new messages
    if (event.type !== "message.new") {
      return res.status(200).json({ ok: true });
    }

    const messageText = event.message.text;
    const lowerText = messageText.toLowerCase();
    const channelId = event.cid.split(":")[1];

    // Trigger only if bot mentioned
    if (!lowerText.includes("@ai")) {
      return res.status(200).json({ ok: true });
    }

    console.log("AI triggered in channel:", channelId);

    // Fetch last messages for context
    const channel = streamClient.channel("messaging", channelId);
    const state = await channel.query({ messages: { limit: 50 } });

    const messagesForAI = state.messages.map((msg) => ({
      role: "user",
      content: msg.text,
    }));

    // ⭐ COMMAND DETECTION
let systemPrompt =
  "You are LinguaLink AI assistant. Keep replies short and friendly.";

// 🌍 TRANSLATE MODE
if (lowerText.includes("translate:")) {
  systemPrompt = `
You are a professional translator.
Translate the user's text into the requested language.
Reply ONLY with the translated sentence.
Example:
German: Hallo
French: Bonjour
`;
}

// 🧠 SUMMARY MODE
else if (lowerText.includes("summarize")) {
  systemPrompt = `
You are an AI meeting assistant.
Summarize the conversation into short bullet points.
Highlight key topics, decisions and important info.
Keep summary under 6 bullet points.
`;
}

// 💡 SMART REPLY MODE
else if (lowerText.includes("reply")) {
  systemPrompt = `
You suggest a short, friendly reply to the LAST message in the chat.
Return only the suggested reply text.
Keep it natural and human.
Example:
"Sure, that works!"
"Sounds good 👍"
"Yes, see you then!"
`;
}

    // Add system prompt
    messagesForAI.unshift({
      role: "system",
      content: systemPrompt,
    });

    // Ask OpenRouter AI
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: messagesForAI,
    });

    const aiReply = completion.choices[0].message.content;

    // Send AI reply into Stream chat
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
