/* eslint-disable react/jsx-closing-tag-location */
import Head from 'next/head'
import Header from '../components/Header'
import Link from 'next/link'

export default function Home () {
  return (
    <div className='relative max-w-full h-screen bg-white overflow-hidden dark:bg-gray-800 text-white'>
      <Head>
        <title>LFScript</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Header />
      <div className='max-w-7xl mx-auto h-screen'>
        <main className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
          <div className='sm:text-center lg:text-left'>
            <h1 className='text-4xl tracking-tight font-extrabold text-gray-800 dark:text-white sm:text-5xl md:text-6xl'>
              <span className='block xl:inline'>LFScript</span>{' '}
            </h1>
            <p className='mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
              Fase 1 del proyecto del curso <a className='underline decoration-rose-600 dark:decoration-rose-400'>Organización de Lenguajes y
                Compiladores 1
              </a>
            </p>
            <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
              <div className='rounded-md shadow'>
                <Link href='/principal'>
                  <button
                    className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 shadow-lg shadow-blue-500/50 md:py-4 md:text-lg md:px-10'
                  >
                    Comenzar
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
