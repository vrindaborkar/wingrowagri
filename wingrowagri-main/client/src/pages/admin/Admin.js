import React from 'react'
import { Route, Routes } from "react-router-dom";
import Adminpage from './Adminpage';
import Adminlogin from './Adminlogin';


const Admin = () => {
  return (
      <Routes>
          <Route path="/" exact element={<Adminlogin/>}/>
          <Route path="/Adminpage" exact element={<Adminpage/>}/>      
      </Routes>
  )
}

export default Admin