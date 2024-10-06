
import { BrowserRouter,Routes,Route } from "react-router-dom"
import React from "react"
import Main from "./Main"
import Pagedetails from "./Pagedetails"
import "./App.css"
const App = () => {
 return(
  <>
  <BrowserRouter>
  <Routes>
  <Route path="/" element={<Main/>}></Route>
  <Route path="/inner" element={<Pagedetails/>}></Route>
  </Routes>
  </BrowserRouter>
  </>
 )
    
  
}

export default App