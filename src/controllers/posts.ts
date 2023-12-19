import { Request, Response } from "express"
import Post from "../models/Post"
import { assertDefined } from "../utils/assertDefined"

export const create = async (req: Request, res: Response) => {
	assertDefined(req.userId)
	const { title, link, body } = req.body

	const post = new Post({
		title,
		link,
		body,
		author: req.userId,
	})

	try {
		const savedPost = await post.save()
		res.status(201).json(savedPost)
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Failed to create post" })
	}
}

export const getAllPosts = async (req: Request, res: Response) => {
	const limit = parseInt(req.query.limit?.toString() || "5")
	const page = parseInt(req.query.page?.toString() || "1")

	if (isNaN(page)) {
		res.status(400).json({
			message: "Malformed query object number: " + req.query.toString(),
		})
	}

	const posts = await Post.find({}, "-comments")
		.sort({ createdAt: "descending" })
		.limit(limit)
		.skip(limit * (page - 1))
		.populate("author", "userName")

	const totalCount = await Post.countDocuments()

	res.status(200).json({
		posts,
		totalPages: Math.ceil(totalCount / limit),
	})
}

export const getPost = async (req: Request, res: Response) => {
	const { id } = req.params

	const post = await Post.findById(id)
		.populate("author")
		.populate("comments.author")

	if (!post) {
		return res.status(404).json({ message: "No post found for id: " + id })
	}

	res.status(200).json(post)
}
export function upvote(
	arg0: string,
	validateToken: (
		req: Request<
			import("express-serve-static-core").ParamsDictionary,
			any,
			any,
			import("qs").ParsedQs,
			Record<string, any>
		>,
		res: Response<any, Record<string, any>>,
		next: import("express").NextFunction,
	) => Response<any, Record<string, any>> | undefined,
	upvote: any,
) {
	throw new Error("Function not implemented.")
}
