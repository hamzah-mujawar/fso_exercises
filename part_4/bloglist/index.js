require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl)
	.then(result => {
		console.log('connecting to MongoDB')
	})
	.catch(error => {
		console.log('error connecting to MongoDB:', error.message)
	})

app.use(express.json())

app.get('/api/blogs', (req, res) => {
	Blog.find({}).then(blogs => {
		res.json(blogs)
	})
})

app.post('/api/blogs', (req, res) => {
	const blog = new Blog(req.body)
	blog.save()
		.then(result => {
			res.json(result)
		})
})

const PORT = process.env.PORT

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
