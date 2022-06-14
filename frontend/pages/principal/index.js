import Header from '../../components/Header'
import Head from 'next/head'
import Pestaña from '../../components/Pestaña'
import { useState } from 'react'
import ButtonPestaña from '../../components/ButtonPestaña'

let noPestaña = 1

export default function Principal () {
  const [botones, setBotones] = useState([
    <ButtonPestaña noPestaña={noPestaña} id={noPestaña} key={noPestaña} />
  ])

  const [pestañas, setPestañas] = useState([
    <Pestaña isHidden={false} key={noPestaña} />
  ])

  const handlerClickNuevaPestaña = () => {
    noPestaña++
    setBotones(currentBotones => currentBotones.concat(<ButtonPestaña noPestaña={noPestaña} id={noPestaña} key={noPestaña} />))
    setPestañas(currentPestañas => currentPestañas.concat(<Pestaña isHidden={false} key={noPestaña} />))
  }

  return (
    <div className='relative h-screen max-w-full dark:bg-gray-800'>
      <Head>
        <title>Principal</title>
      </Head>
      <Header />
      <div className='px-2'>
        {botones}
        <div className='px-2 inline-block'>
          <button className='bg-color-sky-600' onClick={handlerClickNuevaPestaña}> + </button>
        </div>
      </div>

      {pestañas}

    </div>
  )
}
