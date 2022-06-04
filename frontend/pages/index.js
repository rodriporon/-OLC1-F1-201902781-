import Head from 'next/head'
import { Fragment, useState, useEffect } from 'react'
import { Popover, Transition, Switch } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { useTheme } from 'next-themes'

const navigation = [
  { name: 'Archivo', href: '#' },
  { name: 'Reportes', href: '#' },
  { name: 'Ejecutor', href: '#' }

]

export default function Home () {
  const [enabled, setEnabled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setTheme(enabled === false ? 'light' : 'dark')
  })
  const toggleDarkMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (
    <div className='relative bg-white overflow-hidden dark:bg-gray-800 text-white'>
      <Head>
        <title>LFScript</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='max-w-7xl mx-auto'>

        <div className='relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-full lg:w-full lg:pb-28 xl:pb-32 dark:bg-gray-800'>

          <Popover>
            <div className='relative pt-6 px-4 sm:px-6 lg:px-8'>
              <nav className='relative flex items-center justify-between sm:h-10 lg:justify-cen' aria-label='Global'>
                <div className='flex items-center flex-grow flex-shrink-0 lg:flex-grow-0'>
                  <div className='flex items-center justify-between w-full md:w-auto'>
                    <a href='#'>
                      <span className='sr-only'>Workflow</span>
                      <img
                        alt='Logo'
                        className='h-10 w-auto sm:h-10'
                        src='/tomoon.svg'
                      />
                    </a>
                    <div className='-mr-2 flex items-center md:hidden'>
                      <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                        <span className='sr-only'>Open main menu</span>
                        <MenuIcon className='h-6 w-6' aria-hidden='true' />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className='hidden md:block md:ml-10 md:pr-4 md:space-x-8'>
                  {navigation.map((item) => (
                    <a key={item.name} href={item.href} className='font-normal text-gray-800 dark:text-white hover:underline decoration-indigo-500 dark:decoration-indigo-300'>
                      {item.name}
                    </a>
                  ))}
                  <Switch.Group>
                    <Switch.Label className='text-lg'>{theme === 'light' ? '🌚' : '🌞'}</Switch.Label>
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      onClick={toggleDarkMode}
                      className={`${
                        enabled ? 'bg-blue-600' : 'bg-gray-600'
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                    >
                      <span
                        className={`${
                          enabled ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </Switch>
                  </Switch.Group>
                </div>
              </nav>
            </div>

            <Transition
              as={Fragment}
              enter='duration-150 ease-out'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='duration-100 ease-in'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Popover.Panel
                focus
                className='absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'
              >
                <div className='rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden'>
                  <div className='px-5 pt-4 flex items-center justify-between'>
                    <div>
                      <img
                        className='h-8 w-auto'
                        src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                        alt=''
                      />
                    </div>
                    <div className='-mr-2'>
                      <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                        <span className='sr-only'>Close main menu</span>
                        <XIcon className='h-6 w-6' aria-hidden='true' />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className='px-2 pt-2 pb-3 space-y-1'>
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <a
                    href='#'
                    className='block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100'
                  >
                    Log in
                  </a>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <main className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
            <div className='sm:text-center lg:text-left'>
              <h1 className='text-4xl tracking-tight font-extrabold text-gray-800 dark:text-white sm:text-5xl md:text-6xl'>
                <span className='block xl:inline'>LFScript</span>{' '}

              </h1>
              <p className='mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
                Fase 1 del proyecto del curso Organización de Lenguajes y Compiladores 1
              </p>
              <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
                <div className='rounded-md shadow'>
                  <a
                    href='#'
                    className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10'
                  >
                    Comenzar
                  </a>
                </div>
                <div className='mt-3 sm:mt-0 sm:ml-3' />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
