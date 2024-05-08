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
  const [type, setType] = useState<string>("");
  const [polls, setPolls] = useState<poll[]>([]);

  return (
    <authContext.Provider value={{authToken, setAuthToken, type, setType, polls, setPolls}}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/MyPollJS"
            element={<Start />}
          />
          <Route
            path="/MyPollJS/Login"
            element={<Login />}
          />
          <Route
            path="/MyPollJS/register"
            element={<Register />}
          />
          <Route
            path="/MyPollJS/managePolls"
            element={<ManagePolls />}
          />
          <Route
            path="/MyPollJS/createPoll"
            element={<CreatePoll />}
          />
          <Route
            path="/MyPollJS/viewPoll"
            element={<ViewPoll />}
          />
          <Route
            path="/MyPollJS/searchPolls"
            element={<SearchPolls />}
          />
          <Route
            path="/MyPollJS/answerPoll"
            element={<AnswerPoll />}
          />
        </Routes>
      </BrowserRouter>
    </authContext.Provider>
  )
}

export default App
