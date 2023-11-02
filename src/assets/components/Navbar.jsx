import React from 'react'
import '../styles/Navbar.scss'
import { useNavigate } from "react-router-dom";


const Navbar = () => {
   const navigate = useNavigate();

  return (
    <div className='header'>
    <div className='title-header'>
       DELICACY
    </div>
    <div className='navbar-header'>
       <div className="navbar-item">
          <button onClick={() => navigate('/beef')}>Beef</button>
       </div>
       <div className="navbar-item">
          <button onClick={() => navigate('/chicken')}>Chicken</button>
       </div>
       <div className="navbar-item">
          <button onClick={() => navigate('/dessert')}>Dessert</button>
       </div>
       <div className="navbar-item">
          <button onClick={() => navigate('/lamb')}>Lamb</button>
       </div>
       <div className="navbar-item">
          <button onClick={() => navigate('/miscellaneous')}>Miscellaneous</button>
       </div>
       <div className="navbar-item">
          <button onClick={() => navigate('/pasta')}>Pasta</button>
       </div>
       <div className="navbar-item">
          <button onClick={() => navigate('/favorites')}>Favorite</button>
       </div>
    </div>
 </div>
  )
}

export default Navbar
