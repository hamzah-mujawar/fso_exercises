const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :post'))


morgan.token('post', function (req, res) {
    if(req.method === 'POST')
	return(JSON.stringify(req.body))
    else
	return ''
})

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const count = persons.length
    const date = new Date;
    res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)

    if(person)
	res.json(person)
    else
	res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const generateID = () => {

    const max = 10000000 //this should be a big enough number such that our ids are random
    return String(Math.floor(Math.random() * max))
}

app.post('/api/persons', (req, res) => {
    const body = req.body

    if(!body.number){
	return res.status(404).json({
	    error: "number is missing"
	})
    }
    
    if(!body.name){
	return res.status(404).json({
	    error: "name is missing"
	})
    }
    
    if(persons.find(person => person.name === body.name)){
	return res.status(404).json({
	    error: "name must be unique"
	})
    }
    
    const person = {
	number: body.number,
	name: body.name,
	id: generateID(),
    }

    persons = persons.concat(person)

    res.json(person)
})



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
