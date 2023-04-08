

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

function View(props) {

  const handleClosedetail = (e) => {

    props.setShowdetail(false)
  }
  useEffect(() => {


  }, [])


  if (!props.showdetail) {
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
            Detail <br />
            <ul>

              <li>
                <p>FullName: {props.account.fullname}</p>
                <p>Email: {props.account.email}</p>
                <p>Phone: {props.account.phone}</p>
                <p>Department Name: {props.account.department_name}</p>
                <p>Username: {props.account.accountid}</p>
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
