import { useState } from 'react'
import { RoutersMain } from './routes/RoutesMain'
import { StyledToast } from './styles/toast'
import { ResetStyle } from './styles/reset'
import { GlobalStyle } from './styles/global'

function App() {

  return (
    <>
      <div>
        <ResetStyle/>
        <GlobalStyle/>
      <RoutersMain/>
        <StyledToast autoClose={4000}/>
      </div>
    </>
  )
}

export default App
