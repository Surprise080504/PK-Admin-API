const db = require("../models");
const Friends = db.friends;
const Users = db.user;

//new friends
exports.newFriend = async (req, res) => {
    const requestedFriend = await Users.findOne({ email: req.body.friendEmail });
    console.log(requestedFriend);
    if (!requestedFriend) {
        res.status(500).json({ msg: 'notExist' });
    }
    else {
        let isAlreadyFriend = false;
        let friends = await Friends.find({
            friends: { $in: [req.body.senderId] },
        });
        let friendsData = JSON.parse(JSON.stringify(friends))
        await Promise.all(friendsData.map(async (friend) => {
            const friendId = friend.friends.find((m) => m !== req.body.senderId);
            if (friendId == requestedFriend._id) {
                isAlreadyFriend = true
            }
        }))

        //if this friend's email is mine?
        if (requestedFriend._id == req.body.senderId) {
            res.status(500).json({ msg: 'impossible' });
        }
        //if this email's owner is already friend?
        else if (isAlreadyFriend) {
            res.status(500).json({ msg: 'alreadyFriend' });
        }
        //if requested email does not exist


        //save new Friend
        else {
            const newFriend = new Friends({
                friends: [req.body.senderId, requestedFriend._id.toString()],
                friend: requestedFriend._id
            });
            try {
                const savedNewFriend = await newFriend.save();
                await oppositeNewFriend.save();
                res.status(200).json(newFriend);
            }
            catch (err) {
                res.status(500).json(err);
            }
        }
    }

}

//get friends of a user
exports.getFriends = async (req, res) => {
    try {
        // const friends = await Friends.find({
        //     friends: { $in: [req.params.userId] },
        // }).populate("friend", "-id -_id -__v -email -password -roles -createdAt -updatedAt").select("-__v");
        // res.status(200).json(friends);
        console.log(req.params.userId)
        let friends = await Friends.find({
            friends: { $in: [req.params.userId] },
        });
        let friendsData = JSON.parse(JSON.stringify(friends))
        console.log('friends:', friends)
        let userList = []
        await Promise.all(friendsData.map(async (friend, index) => {
            const friendId = friend.friends.find((m) => m !== req.params.userId);
            const user = await Users.findOne({ _id: friendId })
            friendsData[index].friend = JSON.parse(JSON.stringify(user))
            console.log('----------', friendsData[index])
            // userList = userList.push(user)
        }))
        console.log("==========", friendsData)
        // let friendList = friends.populate("friend", "-id -_id -__v -email -password -roles -createdAt -updatedAt").select("-__v");
        res.status(200).json(friendsData);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
