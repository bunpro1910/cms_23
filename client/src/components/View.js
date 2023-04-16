

import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { AiFillCloseSquare } from 'react-icons/ai';
import { io } from 'socket.io-client'
import axios from 'axios'
import { useQuery } from 'react-query'
function View({ props }) {

  let getuser = () => axios.get(`/api/view?id=${props.id}`).then((res) => res.data)
  console.log(props)
  const socketRef = useRef();
  const { isLoading, error, data, isFetching, refetch } = useQuery('view', getuser)

  useEffect(() => {

  }, [])

  if(isLoading)return <>...loading</>
  return (

    <table class="table" >

      <thead class="thead-dark">
        <tr>
          <th scope="col">No</th>
          <th scope="col">Visit Time</th>
          <th scope="col">User</th>
        </tr>
      </thead>
      <tbody>
        {data.quantity!=0?data.view.map((item,i)=>{
          return(
            <>
              <tr>
          <td scope="row">{i+1}</td>
          <td>{item.visittime}</td>
          <td>{item.userid}</td>
        </tr>
            </>
          )
        }):"don't have any view"}
      
        

      </tbody>
    </table>



  );
}

export default View;
