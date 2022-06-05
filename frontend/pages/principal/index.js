import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Head from 'next/head'

export default function Principal () {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/api/notes')
      .then(res => res.json())
      .then(res => setNotes(res))
      .catch(err => console.log(err))
  }, [])
  return (
    <div className='relative h-screen max-w-full dark:bg-gray-800'>
      <Head>
        <title>Principal</title>
      </Head>
      <Header />
      <div>{notes.map(note => note.name)}</div>
    </div>
  )
}
