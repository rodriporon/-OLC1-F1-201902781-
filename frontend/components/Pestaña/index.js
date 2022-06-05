export default function Pestaña ({ hidden }) {
  console.log(hidden)
  return (
    <div className={hidden ? 'hidden' : ''}>
      <div className='relative justify-between items-center px-8 grid lg:grid-cols-2 gap-10'>
        <h3>Editor</h3>
        <h3>Consola</h3>
      </div>
      <div className='relative items-center px-8 grid lg:grid-cols-2 gap-10'>
        <textarea className='bg-gray-200 dark:bg-zinc-700 resize-none rounded-md relative h-96 max-w-screen' />
        <textarea className='bg-gray-200 dark:bg-zinc-700 resize-none rounded-md relative h-96 max-w-screen' />
      </div>
    </div>
  )
}
