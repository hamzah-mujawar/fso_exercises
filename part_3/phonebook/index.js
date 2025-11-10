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

app.get('/api/persons', (req, res) => {
	Person.find({}).then(persons => {
		res.json(persons)
	})
})

app.get('/info', (req, res) => {
	const count = persons.length
	const date = new Date;
	res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
	Person.findById(request.params.id).then(person => {
		res.json(person)
	})
})

app.delete('/api/persons/:id', (req, res) => {
	const id = req.params.id
	persons = persons.filter(person => person.id !== id)

	res.status(204).end()
})

app.post('/api/persons', (req, res) => {
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

	person.save().then(savedPerson => {
		res.json(savedPerson)
	})

})



const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
