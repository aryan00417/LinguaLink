 import {StreamChat} from "stream-chat"
 import "dotenv/config"

 const apiKey = process.env.STREAM_API_KEY
 const apiSecret = process.env.STREAM_API_SECRET

 if(!apiKey || !apiSecret){
  console.error("Stream API key or API secret is missing");
 }

 let streamClient;
 if (apiKey && apiSecret) {
   streamClient = StreamChat.getInstance(apiKey, apiSecret);
 }

 export const upsertStreamUser = async (userData)=>{
  try {
   if (!streamClient) throw new Error("Stream client not initialized - missing API key/secret");
   await streamClient.upsertUsers([userData]);
   return userData
  } catch (error) {
    console.error("error upserting user data ", error);
    throw error;
  }
 };

 export const generateStreamToken = (userId) =>{
  try {
    if (!streamClient) throw new Error("Stream client not initialized - missing API key/secret");
    const userIdStr = userId.toString();
    return streamClient.createToken(userIdStr);

  } catch (error) {
    console.log("error generating Stream token:",error)
    throw error;
  }
 };

