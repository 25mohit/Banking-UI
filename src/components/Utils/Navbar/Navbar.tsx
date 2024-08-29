import React, { useState } from 'react'
import { FaChevronDown } from "react-icons/fa";
import { navbarOption } from '../../../MOC_DATA/Navbar';
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
    const [showMobileNavbar, setShowMobileNavbar] = useState(false)
    const [showOption, setShowOption] = useState('')

  return (
    <nav className='navbar'>
        <div className="top df aic jcsb">
            <img className='logo' src="/Assets/logo.png" alt="" />
            <button className="btn">Login <FaChevronDown /></button>
        </div>
        <div className="menu-section df aic jcc">
            <ul className='df'>
                {
                    navbarOption?.map((option, index) => <li key={index}>
                        <a className='df aic' href={option.link}>{option.label} <FaChevronDown />
                            <ul className="overflow">
                                {
                                    option?.nested?.map((nested, ind) => <li key={ind}><a href={nested.link}>{nested.label}</a></li>)
                                }
                            </ul>
                        </a>
                    </li>)
                }
            </ul>
            <RxHamburgerMenu className='hamburger' onClick={() => setShowMobileNavbar(!showMobileNavbar)}/>
        </div>
        { showMobileNavbar && 
            <div className="mobile-section show">
                <ul className='df'>
                    {
                        navbarOption?.map((option, index) => <li key={index}>
                            <p className={`df ${showOption === option.label ? 'show' : ''}`} onClick={() => setShowOption(option.label)}><span>{option.label} <FaChevronDown /></span>
                                <ul className="overflow">
                                    {
                                        option?.nested?.map((nested, ind) => <li key={ind}><a href={nested.link}>{nested.label}</a></li>)
                                    }
                                </ul>
                            </p>
                        </li>)
                    }
                </ul>
            </div>
        }
    </nav>
  )
}

export default Navbar