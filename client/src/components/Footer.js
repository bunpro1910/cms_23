

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
                <div className='footer-content grid xl:grid-cols-3 md:grid-cols-2 bg-zinc-800 shadow'>
                    <div className='fotter-list'>
                        <h3 className='footer-name text-white uppercase'>Contact</h3>
                        <ul className='text-gray-400'>
                            <li className=' transition-all ml-4 my-2 ease-in-out duration-500 hover:text-rose-600  hover:pl-20 hover:border-none hover:cursor-pointer'><BsFillTelephoneFill className="icons mr-2" />  Hotline: 121212 </li>
                            <li className='transition-all ml-4 my-2 ease-in-out duration-500 hover:text-rose-600  hover:pl-20 hover:border-none hover:cursor-pointer'><BsPinMapFill className="icons mr-2" /> Address: Da Lat </li>
                            <li className='transition-all ml-4 my-2 ease-in-out duration-500 hover:text-rose-600  hover:pl-20 hover:border-none hover:cursor-pointer'><AiFillMail className="icons mr-2" /> Email: sonpham@gmail.com</li>

                        </ul>
                    </div>
                    <div className='fotter-list'>
                        <h3 className='footer-name text-white uppercase'>Project Link</h3>
                        <ul className='text-gray-400'>
                            <li className=' transition-all ml-4 my-2 ease-in-out duration-500 hover:text-rose-600  hover:pl-20 hover:border-none hover:cursor-pointer ' >  <a className='hover:!text-white hover:no-underline' href="https://www.facebook.com/groups/fgw.comp1640.2023.01" target='_blank'><FaFacebook className="icons mr-2" /> Facebook</a></li>
                            <li className=' transition-all ml-4 my-2 ease-in-out duration-500 hover:text-rose-600  hover:pl-20 hover:border-none hover:cursor-pointer'> <AiFillGithub className="icons mr-2" /> Github  </li>
                            <li className=' transition-all ml-4 my-2 ease-in-out duration-500 hover:text-rose-600  hover:pl-20 hover:border-none hover:cursor-pointer'> <AiFillYoutube className="icons mr-2" /> Youtube  </li>
                        </ul>
                    </div>
                    <div className='fotter-list'>
                        <h3 className='footer-name text-white uppercase'>About</h3>
                        <ul className='text-gray-400'>
                            <li className=' transition-all ml-4 my-2 ease-in-out duration-500 hover:text-rose-600  hover:pl-20 hover:border-none hover:cursor-pointer'>Privacy Policy</li>
                            <li className=' transition-all ml-4 my-2 ease-in-out duration-500 hover:text-rose-600  hover:pl-20 hover:border-none hover:cursor-pointer'> Library </li>
                            <li className=' transition-all ml-4 my-2 ease-in-out duration-500 hover:text-rose-600  hover:pl-20 hover:border-none hover:cursor-pointer'> Group Number: 23 </li>
                        </ul>
                    </div>

                </div>
            </div>

        </>
    );
}

export default Footer;
