const db = require("../models");
const Message = db.messages;

//new message
exports.createMessage = async (req, res) => {
    const newMessage = new Message(req.body);
    try {
        await newMessage.save();
        res.status(200).json({msg: 'success'});
    }
    catch (err) {
        res.status(500).json(err);
    }
}

//get messages
exports.getMessage = async (req, res) => {
    try {
        // const messages = await Message.find({
        //     friendId: req.params.friendId,
        // }).populate("sender", " -__v -email -password -roles -createdAt -updatedAt").select("-__v").sort({ 'createdAt': -1 });
        const messages = await Message.find({
            friendId: req.params.friendId,
        }).populate("sender", " -__v -email -password -roles -createdAt -updatedAt").select("-__v");
        res.status(200).json(messages);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
