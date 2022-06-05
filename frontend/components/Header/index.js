import { Fragment, useState, useEffect } from 'react'
import { Popover, Transition, Switch } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { useTheme } from 'next-themes'

const navigation = [
  { name: 'Archivo', href: '#' },
  { name: 'Reportes', href: '#' },
  { name: 'Ejecutor', href: '#' }
]

export default function Header () {
  const [enabled, setEnabled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setTheme(enabled === false ? 'light' : 'dark')
  }, [])
  const toggleDarkMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (
    <div className='relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-full lg:w-full lg:pb-28 xl:pb-32 dark:bg-gray-800'>
      <Popover>
        <div className='relative pt-6 px-4 sm:px-6 lg:px-8'>
          <nav
            className='relative flex items-center justify-between sm:h-10 lg:justify-cen'
            aria-label='Global'
          >
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
                <a
                  key={item.name}
                  href={item.href}
                  className='font-normal text-gray-800 dark:text-white hover:underline decoration-indigo-500 dark:decoration-indigo-300'
                >
                  {item.name}
                </a>
              ))}
              <Switch.Group>
                <Switch.Label className='text-lg'>
                  {theme === 'light' ? '🌚' : '🌞'}
                </Switch.Label>
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
            <div className='rounded-lg shadow-md bg-white dark:bg-gray-500 ring-1 ring-black ring-opacity-5 overflow-hidden'>
              <div className='px-5 pt-4 flex items-center justify-between'>
                <div>
                  <img
                    className='h-8 w-auto'
                    src='/tomoon.svg'
                    alt=''
                  />
                </div>
                <div className='-mr-2'>
                  <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:bg-gray-800 dark:text-white'>
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
                    className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800'
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <Switch.Group>
                <Switch.Label className='text-lg'>
                  {theme === 'light' ? '🌚' : '🌞'}
                </Switch.Label>
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  onClick={toggleDarkMode}
                  className={`${
                    enabled ? 'bg-blue-600' : 'bg-gray-600'
                  } inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                >
                  <span
                    className={`${
                      enabled ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              </Switch.Group>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}
