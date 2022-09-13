import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import {FaBars,FaTimes} from "react-icons/fa";
import {MdFingerprint} from "react-icons/md";
import Button from "../Button";
import { Icon } from '@iconify/react';
import "./Navbar.css"
function Navbar(props) {
    const [click,setClick] = useState(false);
    const [button,setButton] = useState(true);

    function handleClick(){
        setClick(!click)
    }
    function closeMenu(){
        setClick(false)
    }
    function displayButton() {
        if(window.innerWidth<=960){
            setButton(false)
        }
        else{
            setButton(true)
        }
        window.addEventListener('resize',displayButton);
    }
    return (
        <div className='navbar'>
            <div className='navbar-container container'>
                <Link to='/' className='navbar-logo'>
                    <Icon icon="wi:thermometer" width='70' />
                    Thermally
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    {click ? <FaTimes/> : <FaBars/>}
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu' }>
                    <li>
                        <Link to='/' className='nav-links'>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to='/graph' className='nav-links'>
                            Graphs
                        </Link><
                    /li>
                    <li>
                        <Link to='/placeholder1' className='nav-links'>
                            Placeholder
                        </Link>
                    </li>
                    <li className='nav-btn'>
                        {button ? (
                            <Link to='/sign-up' className= 'btn-link'>
                                <Button buttonStyle='btn--outline'>Sign Up</Button>
                            </Link>
                        ):(
                            <Link to='/sign-up' className='btn-link'>
                                <Button buttonStyle= 'btn--outline'
                                        buttonSize='btn--mobile'
                                >Sign Up</Button>
                            </Link>
                        )
                            }
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;