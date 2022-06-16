import Header from '../../components/Header'

const data = [
  { key: 1, tipo: 'SEMANTICO', token: 'num', linea: 1, columna: 0, descripcion: 'variable no definida' },
  { key: 2, tipo: 'SEMANTICO', token: 'num', linea: 1, columna: 0, descripcion: 'variable no definida' },
  { key: 3, tipo: 'SEMANTICO', token: 'num', linea: 1, columna: 0, descripcion: 'variable no definida' }
]

const contadorKey = 0

export default function ReporteErrores () {
  return (
    <div className='dark:bg-gray-800 relative h-screen max-h-full'>
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
              {data.map((error) => (
                <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={contadorKey}>
                  <th scope='row' className='px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap'>
                    {error.tipo}
                  </th>
                  <td className='px-6 py-4'>
                    {error.token}
                  </td>
                  <td className='px-6 py-4'>
                    {error.linea}
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

      {/* <div className='flex flex-col'>
        <div className='overflow-x-auto sm:mx-6 lg:mx-8'>
          <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='overflow-hidden'>
              <table className='border-collapse border border-slate-500 min-w-full'>
                <thead>
                  <tr>
                    <th scope='col' className='border border-slate-600'>
                      Tipo
                    </th>
                    <th scope='col' className='border border-slate-600'>
                      Token
                    </th>
                    <th scope='col' className='border border-slate-600'>
                      Linea
                    </th>
                    <th scope='col' className='border border-slate-600'>
                      Columna
                    </th>
                    <th scope='col' className='border border-slate-600'>
                      Descripcion
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                        data.map(error => (
                          <tr className='border-b' key={error.tipo}>
                            <th class='font-normal py-4 text-gray-900 dark:text-white'>
                              {error.tipo}
                            </th>
                            <th class='font-normal py-4 whitespace-nowrap'>
                              {error.token}
                            </th>
                            <th>
                              {error.linea}
                            </th>
                            <th>
                              {error.columna}
                            </th>
                            <th>
                              {error.descripcion}
                            </th>
                          </tr>
                        ))
                    }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}
