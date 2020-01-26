const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
	{
		message: {
			type: String
		},
		userIp: {
			type: String
		},
		nickname: {
			type: String
		}
	},
	{
		timestamps: true
	}
);

const userSchema = new Schema(
	{
		nickname: {
			type: String,
			required: true,
			unique: true,
			trim: true
		},
		password: {
			type: String,
			required: true,
		}
	},
	{
		timestamps: {
			createdAt: true,
			updatedAt: false
		}
	}
);

let Chat = mongoose.model("theChat", chatSchema);
let Users = mongoose.model("theUser", userSchema);

module.exports = {
	Chat: Chat,
	Users:Users
};