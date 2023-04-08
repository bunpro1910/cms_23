

import { Link, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AiOutlineLike } from 'react-icons/ai';
import { FaFacebook, FaInstagramSquare, FaTwitter } from "react-icons/fa";


function Footer() {
    let [showview, setshowview] = useState(false)
    let [showcomment, setshowcomment] = useState(false)
    useEffect(() => {


    }, [showview])
    return (

        <>
            <div className='footer-page'>
                <div className='footer-content'>


                    <div className='fotter-list'>
                        <h3 className='footer-name'>Contact</h3>
                        <ul>
                            <li> Hotline: 121212 </li>
                            <li> Address: Da Lat </li>
                            <li> Email: asadaf@gmail.com </li>
                        </ul>
                    </div>

                   
                        
                    
                    <div className='fotter-list'>
                        <h3 className='footer-name'>About</h3>
                        <ul>
                            <li> Hotline: 121212 </li>
                            <li> Address: Da Lat </li>
                            <li> Email: asadaf@gmail.com </li>
                        </ul>
                    </div>
                    <div className='fotter-list'>
                        <h3 className='footer-name'>About</h3>
                        <ul>
                            <li> Hotline: 121212 </li>
                            <li> Address: Da Lat </li>
                            <li> Email: asadaf@gmail.com </li>
                        </ul>
                    </div>
                    
                </div>
            </div>

        </>
    );
}

export default Footer;
