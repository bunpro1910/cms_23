

import { Link, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AiOutlineLike, AiFillMail, AiFillGithub, AiFillYoutube } from 'react-icons/ai';
import { BsFillTelephoneFill, BsPinMapFill } from "react-icons/bs";

import { FaFacebook, FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";


function Footer() {
    let [showview, setshowview] = useState(false)
    let [showcomment, setshowcomment] = useState(false)
    useEffect(() => {


    }, [showview])
    return (
        <>
            <div className='footer-page '>
                <div className='footer-content grid xl:grid-cols-3 md:grid-cols-2 !bg-green-500'>
                    <div className='fotter-list'>
                        <h3 className='footer-name'>Contact</h3>
                        <ul className=''>
                            <li className='transition-all ml-4 my-2 ease-in-out duration-500 hover:text-white hover:pl-20 hover:border-none hover:cursor-pointer'><BsFillTelephoneFill className="icons" />  Hotline: 121212 </li>
                            <li className='transition-all ml-4 my-2 ease-in-out duration-500 hover:text-white hover:pl-20 hover:border-none hover:cursor-pointer'><BsPinMapFill className="icons" /> Address: Da Lat </li>
                            <li className='transition-all ml-4 my-2 ease-in-out duration-500 hover:text-white hover:pl-20 hover:border-none hover:cursor-pointer'><AiFillMail className="icons" /> Email: sonpham@gmail.com</li>
                            
                        </ul>
                    </div>
                    <div className='fotter-list'>
                        <h3 className='footer-name'>Follow us</h3>
                        <ul>
                            <li className=' transition-all ml-4 my-2 ease-in-out duration-500 hover:text-white hover:pl-20 hover:border-none hover:cursor-pointer ' >  <a className='hover:!text-white hover:no-underline' href="https://www.facebook.com/groups/fgw.comp1640.2023.01" target='_blank'><FaFacebook className="icons" /> Facebook</a></li>
                            <li className=' transition-all ml-4 my-2 ease-in-out duration-500 hover:text-white hover:pl-20 hover:border-none hover:cursor-pointer'> <AiFillGithub className="icons"/> Github  </li>
                            <li className=' transition-all ml-4 my-2 ease-in-out duration-500 hover:text-white hover:pl-20 hover:border-none hover:cursor-pointer'> <AiFillYoutube className="icons"/> Youtube  </li>
                        </ul>
                    </div>
                    <div className='fotter-list'>
                        <h3 className='footer-name'>About</h3>
                        <ul>
                            <li className=' transition-all ml-4 my-2 ease-in-out duration-500 hover:text-white hover:pl-20 hover:border-none hover:cursor-pointer'>Privacy Policy</li>
                            <li className=' transition-all ml-4 my-2 ease-in-out duration-500 hover:text-white hover:pl-20 hover:border-none hover:cursor-pointer'> Library </li>
                            <li className=' transition-all ml-4 my-2 ease-in-out duration-500 hover:text-white hover:pl-20 hover:border-none hover:cursor-pointer'> Group Number: 23 </li>
                        </ul>
                    </div>

                </div>
            </div>

        </>
    );
}

export default Footer;
