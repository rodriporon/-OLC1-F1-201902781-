
export default function ButtonPestaña ({ noPestaña }) {
  return (

    <button className='font-sans dark:hover:bg-rose-600 hover:bg-indigo-400 bg-indigo-300 dark:bg-rose-500 rounded-sm px-4 mx-px' id={noPestaña} key={noPestaña}>Pestaña {noPestaña}</button>
  )
}
