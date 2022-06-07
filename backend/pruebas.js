const fs = require('fs')
const parser = require('./gramatica')

fs.readFile('./entrada.txt', (err, data) => {
    if (err) throw err;
    parser.parse(data.toString())
})