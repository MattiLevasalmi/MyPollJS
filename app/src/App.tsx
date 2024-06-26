import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Start from './Start'
import './App.css'
import { authContext, poll } from './context'
import { useState } from 'react'
import ManagePolls from './ManagePolls'
import CreatePoll from './CreatePoll'
import ViewPoll from './ViewPoll'
import SearchPolls from './SearchPolls'
import AnswerPoll from './AnswerPoll'
import Register from './Register'


function App() {
  
  const [authToken, setAuthToken] = useState<string>("");
  const [ID, setID] = useState<string>("");
  const [polls, setPolls] = useState<poll[]>([]);

  return (
    <authContext.Provider value={{authToken, setAuthToken, ID, setID, polls, setPolls}}>
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
            path="/register"
            element={<Register />}
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
          <Route
            path="/searchPolls"
            element={<SearchPolls />}
          />
          <Route
            path="/answerPoll"
            element={<AnswerPoll />}
          />
        </Routes>
      </BrowserRouter>
    </authContext.Provider>
  )
}

export default App
