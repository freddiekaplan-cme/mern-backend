import { Document, Schema, model } from "mongoose"
import bcrypt from "bcrypt"

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
			trim: true, //ta bort extra mellanslag osv
		},
		password: {
			type: String,
			select: false, // standardbeteende blir att inte plocka ut lösen
			required: true,
		},
	},
	{
		//options
		timestamps: true,
	},
)

//OBS använd function och inte arrow function
UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) next()

	const passwordHash = await bcrypt.hash(this.password, 10)
	this.password = passwordHash
})

const User = model<IUser>("User", UserSchema)

export default User
