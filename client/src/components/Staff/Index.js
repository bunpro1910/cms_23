

import { useRef, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import axios from 'axios'
import { useQuery } from 'react-query'
import { AiOutlineSend } from 'react-icons/ai';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Store } from 'react-notifications-component'
function View(props) {
    let user = JSON.parse(localStorage.getItem('user'))
    return (
        <>
            <div className="row">
            <div className="left">
                <ul>
                    {user.isAdmin?<>   
                    <li><Link to='./user'>Manager User</Link></li>
                    <li><Link to='./role'>Manager Role</Link></li> 
                    <li><Link to='./managertopic'>Manager Topic </Link></li>
                    </>
                    :""}
                    <li><Link to='./topic'> View Submission</Link></li>
                    <li><Link to='./department'>Manager Department</Link></li>
                    <li><Link to='./category'>Manager Category</Link></li>
                    <li><Link to='../topic'>View Topic</Link></li>
                    <li><Link to='./departmentdetail'>Statitics</Link></li>
                    
                </ul>
            </div>
            <div className="right">
                
              <img  src="https://kinsta.com/wp-content/uploads/2018/03/content-management-system-2.png" alt=""/>
            </div>

            </div>
        </>

    );
}

export default View;
