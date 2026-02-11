import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const [ws, setWs] = useState(null)
  const [input, setInput] = useState('')

  useEffect(() => {
    const socket = new WebSocket(`ws://${window.location.hostname}:81`)

    socket.onopen = () => {
      console.log('WebSocket connection established')
      socket.send('Hello Server!')
    }

    socket.onmessage = (event) => {
      console.log('Received message from server:', event.data)
      setMessages(prev => [...prev, event.data])
    }

    socket.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    socket.onclose = () => {
      console.log('WebSocket connection closed')
    }

    setWs(socket)

    return () => socket.close()
  }, [])

  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN && input.trim()) {
      ws.send(input)
      setInput('')
    }
  }

  return (
    <>
      <div className="App">
        <h1>WebSocket Test</h1>
        <div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
        <h2>Messages:</h2>
        <ul>
          {messages.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
