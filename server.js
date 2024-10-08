const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))
app.use(express.static('staticAssets'))

app.get('/', (request, response) => {
  response.send('<h1>Hello there</h1>')
})

app.get('/about', (request, response) => {
  response.send('<h1>Hello about page</h1>')
})

const recipes = [
  { id: '1', name: 'Pizza' },
  { id: '2', name: 'Tacos' },
  { id: '3', name: 'Tiramisu' },
]

app.get('/api/recipes', (request, response) => {
  response.status(201).json(recipes)
})

app.get('/api/recipes/new', (request, response) => {
  console.log(request.query)

  response.status(201).json({ message: `${request.query.pizza} created` })
})

app.get('/api/recipes/:recipeId', (request, response) => {
  console.log(request.params)
  const { recipeId } = request.params

  response.status(201).json(recipes.find(currentRecipe => currentRecipe.id === recipeId))
})

app.listen(3001, () => {
  console.log('Running on http://localhost:3001')
})
