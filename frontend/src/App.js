import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Error from './components/Error'
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';


const App = () => (
  <BrowserRouter>
    <Container>
      <Navbar />
      <Routes>
        <Route path="*" element={<Error/>}/>
        <Route path="/"  exact element={<Auth />} />
        <Route path="/auth"  exact element={<Auth />} />
        <Route path="/Posts"  exact element={<Home />} />
      </Routes>
    </Container>
  </BrowserRouter>
);

export default App;
