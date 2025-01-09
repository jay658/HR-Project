import './App.css'

import { useEffect, useState } from 'react'

import reactLogo from './assets/react.svg'
import { styled } from '@mui/material/styles'
import viteLogo from '/vite.svg'

const StyledDiv = styled('div')(({ theme }) => ({
  color:theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius
}))

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3000/api/user/test')
      const data = await res.json()

      console.log(data)
    }

    fetchData()
  }, [])  

  return (
    <>
      <StyledDiv>
        Styled with theme
      </StyledDiv>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
