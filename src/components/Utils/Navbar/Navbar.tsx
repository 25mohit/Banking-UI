import React from 'react'
import { FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className="top df aic jcsb">
            <h3>ICICI Bank</h3>
            <button className="btn">Login <FaChevronDown /></button>
        </div>
        <div className="menu-section df aic jcc">
            <ul className='df'>
                <li className='df aic'>Accounts <FaChevronDown /></li>
                <li className='df aic'>Accounts <FaChevronDown /></li>
                <li className='df aic'>Accounts <FaChevronDown /></li>
                <li className='df aic'>Accounts <FaChevronDown /></li>
                <li className='df aic'>Accounts <FaChevronDown /></li>
                <li className='df aic'>Accounts <FaChevronDown /></li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar