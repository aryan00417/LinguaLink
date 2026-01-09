import { generateStreamToken } from "../lib/stream.js";

export const getStreamToken = async (req, res) => {
  try {
    const userId = req.user && (req.user._id || req.user.id);
    if (!userId) {
      console.error("getStreamToken: user id not found on req.user", req.user);
      return res.status(401).json({ message: "Unauthorized - user not found" });
    }

    const token = generateStreamToken(userId.toString());
    if (!token) {
      console.error("getStreamToken: token generation failed for user", userId);
      return res.status(500).json({ message: "Could not generate Stream token" });
    }

    res.status(200).json({ token });
  } catch (error) {
    console.log("Error in getStreamToken controller ", error && error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}