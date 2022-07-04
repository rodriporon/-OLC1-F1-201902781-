import { useEffect } from 'react'

export default function ReporteAst () {
  const loadAST = async () => {
    try {
      const response = await fetch('http://lfscript-api.vercel.app/reporte-ast')
      const items = await response.json()
      console.log(items)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    loadAST()
  }, [])

  return (
    <div>
      <h1>Reporte AST</h1>
    </div>
  )
}
