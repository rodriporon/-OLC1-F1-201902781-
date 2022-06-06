import { ChevronDownIcon } from '@heroicons/react/solid'
import { Fragment, useState } from 'react'
import { Menu, Transition, Dialog } from '@headlessui/react'

export default function Pestaña ({ hidden }) {
  const [isOpen, setIsOpen] = useState(false)
  const [fileValue, setFileValue] = useState('')

  const handlerOnChangeTextArea = e => {
    setFileValue(e.target.value)
  }

  const closeModal = (e) => {
    const file = e.target.files[0]
    const fileReader = new window.FileReader()

    fileReader.readAsText(file, 'UTF-8')

    fileReader.onload = (e) => {
      setFileValue(e.target.result)
    }

    fileReader.onerror = e => {
      console.log(fileReader.error)
    }

    setIsOpen(false)
  }

  function openModal () {
    setIsOpen(true)
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Abrir archivo LF
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      Selecciona un archivo con extensión [LF]
                    </p>
                  </div>

                  <div className='mt-4'>
                    <input
                      type='file'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onChange={closeModal}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className={hidden ? 'hidden' : ''}>
        {/* -- dropdown menu archivo -- */}
        <div className='flex justify-end items-right'>
          <Menu as='div' className='relative inline-block text-left z-10'>
            <div>
              <Menu.Button className='inline-flex w-full justify-center rounded-md dark:bg-gray-900 bg-gray-300  px-4 py-2 text-sm font-medium dark:text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
                Archivo
                <ChevronDownIcon
                  className='ml-2 -mr-1 h-5 w-5 dark:text-violet-200 dark:hover:text-indigo-100'
                  aria-hidden='true'
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='px-1 py-1 '>

                  <Menu.Item>

                    {({ active }) => (
                      <button
                        className={`${
                      active ? 'bg-rose-400 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        type='file'
                        onClick={openModal}
                      >
                        Abrir archivo
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                      active ? 'bg-rose-400 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Guardar
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className='px-1 py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                      active ? 'bg-rose-400 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Guardar como
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                      active ? 'bg-rose-400 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Crear
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* -- termina menu archivo -- */}
        </div>
        <div className='relative items-center px-8 grid lg:grid-cols-2 gap-10'>
          <div className='relative'>
            <h4 className='font-medium underline dark:decoration-sky-400 decoration-sky-500 py-4'>Editor</h4>
            <textarea value={fileValue} className='shadow-xl bg-gray-200 dark:bg-zinc-700 resize-none rounded-md relative h-96 w-full max-w-full' onChange={handlerOnChangeTextArea} />
          </div>
          <div className='relative'>
            <h4 className='font-medium underline dark:decoration-pink-400 decoration-pink-500 py-4'>Consola</h4>
            <textarea className='shadow-xl bg-gray-200 dark:bg-zinc-700 resize-none rounded-md relative h-96 w-full max-w-full' />
          </div>

        </div>
      </div>
    </>
  )
}
