require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()


const Person = require('./models/persons')

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :post'))


morgan.token('post', function(req, res) {
	if (req.method === 'POST')
		return (JSON.stringify(req.body))
	else
		return ''
})

app.get('/api/persons', (req, res, next) => {
	Person.find({}).then(persons => {
		res.json(persons)
	})
		.catch(error => next(error))
})

app.get('/info', (req, res, next) => {
	Person.find({}).then(person => {
		const count = person.length
		const date = new Date;
		res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`)
	})
		.catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id)
		.then(person => {
			if (person)
				res.json(person)
			else
				res.status(404).end()
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndDelete(req.params.id)
		.then(result => {
			res.status(204).end()
		})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
	const body = req.body
	const person = {
		name: body.name,
		number: body.number,
	}
	Person.findByIdAndUpdate(req.params.id, person, { runValidators: true })
		.then(result => {
			res.json(person)
		})
		.catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
	const body = req.body

	if (!body.number) {
		return res.status(404).json({
			error: "number is missing"
		})
	}

	if (!body.name) {
		return res.status(404).json({
			error: "name is missing"
		})
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person.save()
		.then(savedPerson => {
			res.json(savedPerson)
		})
		.catch(error => next(error))

})

const errorHandler = (error, req, res, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message })
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
