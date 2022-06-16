import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Head from 'next/head'

export default function ReporteErrores () {
  const [errores, setErrores] = useState([])

  const loadErrors = async () => {
    try {
      const response = await fetch('http://localhost:3001/reporte-errores')
      const items = await response.json()
      setErrores(items)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadErrors()
  }, [])

  return (
    <div className='dark:bg-gray-800 relative h-screen max-h-full'>
      <Head>
        <title>Reporte Errores</title>
      </Head>
      <Header />
      <div className='overflow-x-auto sm:mx-6 lg:mx-8'>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-center text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Tipo
                </th>
                <th scope='col' className='px-6 py-3'>
                  Token
                </th>
                <th scope='col' className='px-6 py-3'>
                  Linea
                </th>
                <th scope='col' className='px-6 py-3'>
                  Columna
                </th>
                <th scope='col' className='px-6 py-3'>
                  Descripcion
                </th>
              </tr>
            </thead>
            <tbody>
              {errores.map((error, index) => (
                <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={index}>
                  <th scope='row' className='px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap'>
                    {error.tipo}
                  </th>
                  <td className='px-6 py-4'>
                    {error.token}
                  </td>
                  <td className='px-6 py-4'>
                    {error.fila}
                  </td>
                  <td className='px-6 py-4'>
                    {error.columna}
                  </td>
                  <td className='px-6 py-4'>
                    {error.descripcion}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
