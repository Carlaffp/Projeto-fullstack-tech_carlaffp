import { useState } from 'react'
import { RoutersMain } from './routes/RoutesMain'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <RoutersMain/>
      </div>
    </>
  )
}

export default App
