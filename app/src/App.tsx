import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Start from './Start'
import './App.css'
import { authContext, poll } from './context'
import { useState } from 'react'
import ManagePolls from './ManagePolls'
import CreatePoll from './CreatePoll'
import ViewPoll from './ViewPoll'


function App() {
  
  const [authToken, setAuthToken] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [polls, setPolls] = useState<poll[]>([]);

  return (
    <authContext.Provider value={{authToken, setAuthToken, type, setType, polls, setPolls}}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Start />}
          />
          <Route
            path="/Login"
            element={<Login />}
          />
          <Route
            path="/managePolls"
            element={<ManagePolls />}
          />
          <Route
            path="/createPoll"
            element={<CreatePoll />}
          />
          <Route
            path="/viewPoll"
            element={<ViewPoll />}
          />
        </Routes>
      </BrowserRouter>
    </authContext.Provider>
  )
}

export default App
