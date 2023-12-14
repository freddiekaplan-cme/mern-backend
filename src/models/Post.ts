import { Document, Schema, Types, model } from "mongoose"

interface IPost extends Document {
	title: string
	link?: string
	body?: string
	author: Types.ObjectId
	createdAt: Date
	upDatedAt: Date
}

const PostSchema = new Schema<IPost>(
	{
		title: {
			type: "string",
			required: true,
			trim: true,
		},
		link: {
			type: "string",
			trim: true,
		},
		body: {
			type: "string",
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	},
)

const Post = model<IPost>("Post", PostSchema)

export default Post
