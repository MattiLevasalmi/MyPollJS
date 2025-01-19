import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Start from './pages/Start'
import Login from './oldfiles/Login'
import { authContext, poll } from './oldfiles/context'
import { useState } from 'react'
import ManagePolls from './oldfiles/ManagePolls'
import CreatePoll from './oldfiles/CreatePoll'
import ViewPoll from './oldfiles/ViewPoll'
import SearchPolls from './oldfiles/SearchPolls'
import AnswerPoll from './oldfiles/AnswerPoll'
import Register from './oldfiles/Register'


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
            element={
            <>
              <Header title={"MyPollJS"} subtitle={"Home Page"}/>
              <Start />
            </>}
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
