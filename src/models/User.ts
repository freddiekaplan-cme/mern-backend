import { Document, Schema, model } from "mongoose"

//interface user
interface IUser extends Document {
	userName: string
	password: string
	createdAt: Date
	updatedAt: Date
}

const UserSchema = new Schema<IUser>(
	{
		userName: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			//ta bort extra mellanslag osv
		},
		password: {
			password: String,
			required: true,
		},
	},
	{
		//options
		timestamps: true,
	},
)

const User = model<IUser>("User", UserSchema)

export default User
