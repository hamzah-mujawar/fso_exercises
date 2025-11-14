const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', (req, res, next) => {
	Blog.find({}).then(blogs => {
		res.json(blogs)
	})
		.catch(error => next(error))
})

blogsRouter.post('/', (req, res, next) => {
	const blog = new Blog(req.body)
	blog.save()
		.then(result => {
			res.json(result)
		})
		.catch(error => next(error))
})


module.exports = blogsRouter
