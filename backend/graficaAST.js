const fs = require('fs')

const graficarAST = (ast) => {
  createArchivoDot()
}

const createArchivoDot = (cadenaDot) => {
  fs.appendFile('archivo.dot', cadenaDot, (err) => {
    if (err) {
      console.error(err)
    }
  })
  console.log('Archivo dot creado')
}

module.exports = graficarAST
