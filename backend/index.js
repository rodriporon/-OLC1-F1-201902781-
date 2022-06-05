const express = require('express')
const app = express()

let notes = [
    {
        "id": 1,
        "name": "Rodri",
        "age": 23
    }
]

app.get('/', (req, res) => {
    res.send('<h3>Server running</h3>')
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


