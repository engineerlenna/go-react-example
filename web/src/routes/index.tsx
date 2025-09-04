import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'
import { useState, useEffect } from 'react'
import ky from 'ky'

export const Route = createFileRoute('/')({
  component: App,
})

interface HelloResponse {
  message: string
}

interface TimeResponse {
  time: string
}

function App() {
  const [message, setMessage] = useState('')
  const [serverTime, setServerTime] = useState('')

  useEffect(() => {
    Promise.all([
      ky.get('/api/hello').json<HelloResponse>(),
      ky.get('/api/time').json<TimeResponse>(),
    ])
      .then(([helloData, timeData]) => {
        setMessage(helloData.message)
        setServerTime(timeData.time)
      })
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <img
          src={logo}
          className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
          alt="logo"
        />
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <div className="mt-4 space-y-2">
          <p className="text-yellow-400">
            Message from Go backend: {message}
          </p>
          <p className="text-cyan-400">
            Current server time: {serverTime}
          </p>
        </div>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TanStack
        </a>
      </header>
    </div>
  )
}
