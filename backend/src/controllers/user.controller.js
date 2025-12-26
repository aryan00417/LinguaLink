import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export const getRecommendedUsers = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, //exclude current user
        { _id: { $nin: currentUser.friends } }, //exclude current users friends
        { isOnboarded: true },
      ],
    });
    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.log("error in geting recommendedUsers");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );

    res.status(200).json(user.friends);
  } catch (error) {
    console.log("Error in getMyFriends:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendFriendRequest = async(req,res)=>{
  try {
    const myId = req.user.id;
    const {id: recipientId} = req.params

    if(myId === recipientId){
      return res.status(400).json({message: "you cant send friend request to yourself"})
    }

    const recipient = await User.findById(recipientId);
    if(!recipient){
      return res.status(404).json({message: "Recepient not found"})
    }

    if(recipient.friends.includes(myId)){
      return res.status(400).json({message:"You are already friends with this user"})
    }

    // check id a request has already has been sent 
    const exsistingRequest = await FriendRequest.findOne({
      $or:[
        {sender:myId, recipient:recipientId},
        {sender:recipientId, recipient:myId}
      ]
    })

    if(exsistingRequest){
      return res.status(400).json({message: "A friend request has already been sent"})
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    })

    res.status(201).json(friendRequest)

  } catch (error) {
    console.log("Error in sending friend request ",error.message)
    return res.status(500).json({message: "Internal server error"})
  }
}

export const acceptFriendRequest = async(req,res)=>{  
  try {
    const {id:requestId} = req.params
    const friendRequest = await FriendRequest.findById(requestId);

    if(!friendRequest){
      return res.status(404).json({message: "Friend Request not found"})
    }

    //verify if the current user is recepient
    if(friendRequest.recipient.toString() !== req.user.id.toString()){
      return res.status(403).json({message: "You are not authorized to accept this request"})
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    //add each user to others friends request
    // $addToSet adds elements to array if they do not exsist in that array
    await User.findByIdAndUpdate(friendRequest.sender,{
      $addToSet: {friends: friendRequest.recipient}
    })
     await User.findByIdAndUpdate(friendRequest.recipient,{
      $addToSet: {friends: friendRequest.sender}
    })

    res.status(200).json({message: "Friend request accepted"})

  } catch (error) {
    console.log("Error in accepting friend request ",error.message)
    return res.status(500).json({message: "Internal server error"})
  }
}