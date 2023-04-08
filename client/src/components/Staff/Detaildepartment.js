

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

function View( props ) {

    const handleClosedetail = (e)=>{

        props.setshowdetail(false)
    }
  useEffect(() => {

 
  }, [])
 

  if(!props.showdetail){
    return 
  }
  return (
    <>

      <Dialog
        open={props.showdetail}
        onClose={handleClosedetail}
        scroll='paper'
        fullWidth={true}
        maxWidth='md'
      >
        <DialogTitle>Detail</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            tabIndex={-1}
          >
           Detail <br/>
           <ul>
            <li>
            <p>ID: {props.department.id}</p>
            </li>
            <li>
            <p>Name: {props.department.name}</p>
            </li>
  </ul>
           
            
          </DialogContentText>

        </DialogContent>
        <DialogActions>
              <Button onClick={handleClosedetail}>Close</Button>
        </DialogActions>
      </Dialog>

    </>

  );
}

export default View;
