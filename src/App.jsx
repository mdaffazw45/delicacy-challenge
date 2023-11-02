// App.jsx
import React from 'react';
import Page from './assets/components/Page.jsx';
import Detail from './assets/components/Detail.jsx';
import Favorite from './assets/components/Favorite.jsx';
import Navbar from './assets/components/Navbar.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/favorites" element={<Favorite />} />
      <Route path="/detail/:mealName" element={<Detail />} />
      <Route path="/:category" element={<Page />} />
      </Routes>
    </Router>
  );
}

export default App;
