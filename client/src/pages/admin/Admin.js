import React from 'react'
import { Route, Routes } from "react-router-dom";
import Adminpage from './Adminpage';

const Admin = () => {
  return (
      <Routes>
          <Route path="/" exact element={<Adminpage/>}/>
        </Routes>
  )
}

export default Admin