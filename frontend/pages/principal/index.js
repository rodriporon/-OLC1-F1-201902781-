import Header from '../../components/Header'
import Head from 'next/head'
import Pestaña from '../../components/Pestaña'

export default function Principal () {
  return (
    <div className='relative h-screen max-w-full dark:bg-gray-800'>
      <Head>
        <title>Principal</title>
      </Head>
      <Header />
      <Pestaña hidden={false} />
    </div>
  )
}
