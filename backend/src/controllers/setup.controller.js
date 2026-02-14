import { StreamChat } from "stream-chat";

const streamClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET
);

export const createLinguaBot = async (req, res) => {
  try {
   await streamClient.upsertUser({
  id: "ai",   
  name: "Lingua AI ",
  role: "admin",
  image: "https://getstream.io/random_png/?name=ai",
});

    res.json({ message: "Lingua Bot created successfully " });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create bot" });
  }
};