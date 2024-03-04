import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import './App.css'
import { authContext } from './context'
import { useState } from 'react'


function App() {
  
  const [authToken, setAuthToken] = useState<string>("");
  const [type, setType] = useState<string>("");

  return (
    <authContext.Provider value={{authToken, setAuthToken, type, setType}}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login />}
          />
        </Routes>
      </BrowserRouter>
    </authContext.Provider>
  )
}

export default App
