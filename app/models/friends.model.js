const mongoose = require("mongoose");

const Friends = mongoose.model(
    "Friends",
    new mongoose.Schema({
        friends: {
            type: Array,
        },
        friend: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        unReadMessageCnt: {
            type: Number,
            default: 0
        },
        lastMessage: {
            type: String,
            default: ""
        },
    }, { timestamps: true, toObject: { virtuals: true, }, toJSON: { virtuals: true } })
);

module.exports = Friends;