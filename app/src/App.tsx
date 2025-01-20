import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Start from './pages/Start'
import Login from './pages/Login'
import ManagePolls from './pages/ManagePolls'
import CreatePoll from './oldfiles/CreatePoll'
import ViewPoll from './oldfiles/ViewPoll'
import SearchPolls from './oldfiles/SearchPolls'
import AnswerPoll from './oldfiles/AnswerPoll'
import Register from './pages/Register'
import { authContext, poll } from './context/context'
import { useState } from 'react'


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
            element={
              <>
                <Header title={"MyPollJS"} subtitle={"Login Page"}/>
                <Login />
              </>}
          />
          <Route
            path="/register"
            element={
              <>
                <Header title={"MyPollJS"} subtitle={"Registration Page"}/>
                <Register />
              </>}
          />
          <Route
            path="/managePolls"
            element={
              <>
                <Header title={"MyPollJS"} subtitle={"Manage Polls Page"}/>
                <ManagePolls />
              </>}
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
