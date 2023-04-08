

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
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
function View(props) {
  let name = props.data.department.reduce((init,item)=>{
    init.push(item.name)
    return init
  },[])
  let data = props.data.department.reduce((init,item)=>{
    init.push(item.totalidea)
    return init
  },[])
  
  let color = props.data.department.reduce((init,item)=>{
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    init.push("#"+randomColor)
    return init
  },[])
  let bordercolor = color.reduce((init,item)=>{
    
    init.push("#000000")
    return init
  },[])
  console.log(bordercolor)
  const datachart = {
    labels: name,
    datasets: [
      {
        label: 'Total',
        data: data,
        backgroundColor: color,
        borderColor: bordercolor,
        borderWidth: 1,
      }
    ]
  };

  
  const handleClosechart = (e) => {
    props.setshowchart(false)
  }
  return (
    <>
      <Dialog
        open={props.showchart}
        onClose={handleClosechart}
        scroll='body'

        fullWidth={true}
        maxWidth='md'
      >
        <DialogTitle>Chart</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText

            tabIndex={-1}
          >
            <div className='chart'>
              <Pie data={datachart} width={350} style={{margin:'auto'}} options={{responsive:false}} height={350} />
            </div>

          </DialogContentText>
        </DialogContent>
        <DialogActions>


          <Button onClick={handleClosechart}>Cancel</Button>
        </DialogActions>
      </Dialog>

    </>

  );
}

export default View;
