import { Request, Response } from "express"
import User from "../models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req: Request, res: Response) => {
	//body kommer från Express
	const { username, password } = req.body

	try {
		if (await User.findOne({ username: username })) {
			return res.status(400).json({ message: "Username already in use" })
		}
		// const passwordHash = await bcrypt.hash(password, 10)

		// const user = new User({ userName: username, password: passwordHash })
		const user = new User({ userName: username, password })
		await user.save()

		res.status(201).json({ username, id: user._id })
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" })
	}
}

export const logIn = async (req: Request, res: Response) => {
	console.log("req userId ", req.userId)
	try {
		//ta in användarnamn och lösen
		const { username, password } = req.body
		//hitta en användare
		const user = await User.findOne({ userName: username })

		if (!user || !(await bcrypt.compare(password, user.password))) {
			console.log(user, password)
			return res
				.status(400)
				.json({ message: "Wrong username or password" })
		}

		const secret = process.env.JWT_SECRET
		if (!secret) {
			throw Error("Missing JWT_SECRET")
		}

		//returnera JWT
		const token = jwt.sign({ userId: user._id }, secret)

		res.status(200).json({ token, username: user.userName })
	} catch (error) {
		res.status(500).json({
			message: "Something blew up",
		})
	}
}

export const profile = async (req: Request, res: Response) => {
	const { userId } = req

	const user = await User.findById(userId)

	if (!user) {
		console.log("User not found with id: ", userId)
		return res.status(404).json({ message: "User not found" })
	}

	res.status(200).json({ userName: user?.userName })
}
