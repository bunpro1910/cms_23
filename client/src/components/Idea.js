
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect, useRef, } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { useQuery, useQueries } from 'react-query'
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import View from './View'
import Comment from './Comment'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify'
function Idea() {
  let params = useParams()
  let [showview, setshowview] = useState(false)
  let [showdetail, setshowdetail] = useState(false)
  let [showcomment, setshowcomment] = useState(false)
  let [ideadetail, setideadetail] = useState('')

  let [idd, setideaid] = useState('')
  const id = params.id
  console.log(params.page)
  let getidea = () => axios.get(`/api/idea?id=${id}`).then((res) => res.data)
  let getcount = () => axios.get(`/api/count?id=${id}`).then((res) => res.data)
  let getreact = () => axios.get(`/api/countreact?id=${id}`).then((res) => res.data)
  let gettopic = () => axios.get(`/api/topic?id=${id}`).then((res) => res.data)
  let user = JSON.parse(localStorage.getItem('user'))
  const socketRef = useRef();
  const { isLoading: isloadingtopic, error: errtopic, data: topic, isFetchingtopic, refetch: refetchtopic } = useQuery(['topic', params.id], gettopic, { staleTime: Infinity, cacheTime: Infinity })
  const { isLoading: isloadingidea, error: erridea, data: idea, isFetching, refetch: refetchidea } = useQuery(['idea', params.id], getidea, { staleTime: Infinity, cacheTime: Infinity })
  const { isLoading: isloadingcount, error: errcount, data: count, isFetching: isFetchingcount, refetch: refetchcount } = useQuery('count', getcount, { staleTime: Infinity, cacheTime: Infinity })
  const { isLoading: isloadingreact, error: errreact, data: react, isFetching: isFetchingreact, refetch: refetchreact } = useQuery('countreact', getreact, { staleTime: Infinity, cacheTime: Infinity })
  const handleClickOpen = (idd) => (e) => {
    setideaid(idd)
    setshowview(true);

  };
  const openshowdetail = (ideadetail) => async (e) => {
    setideadetail(ideadetail)
    let result = await axios.get('/api/addview', { params: { id: ideadetail.id } })
    console.log(result)
    setshowdetail(true)
  }
  const closeshowdetail = (e) => {
    setshowdetail(false)

  }
  const handleClose = (e) => {
    setshowview(false);
  };
  const handleClickOpencomment = (idd) => (e) => {
    setideaid(idd)
    setshowcomment(true);

  };
  useEffect(() => {

    socketRef.current = io.connect(`http://localhost:3001/`)
    socketRef.current.on('newtopic', (args) => {
      refetchidea()
    })
    socketRef.current.on('reloadcount', (args) => {

      refetchcount()
    })
    socketRef.current.on('reloadreact', (args) => {

      refetchreact()
    })
    socketRef.current.on('reloadidea', (args) => {
      let user = JSON.parse(localStorage.getItem('user'))
      console.log(args, user)
      if (args.user.find(user.id)) {
        toast.success("your staff was submited")
      }
      refetchidea()
    })



  }, [showcomment, showview])
  if (isloadingidea) { return <>... loading</> }
  if (isloadingcount) { return <>... loading</> }
  if (isloadingreact) { return <>... loading</> }
  if (isloadingtopic) { return <>... loading</> }
  console.log(react)
  if (idea.quantity == 0) {
    return (
      <div className='idea-page'>
        {new Date(topic.topic[0].clousuredate) <= new Date() && new Date() <= new Date(topic.topic[0].finalclosuredate) ? <Link to='/addidea' state={{ topicid: id }}>add new idea</Link> : ""}
        <p>{idea.idea}</p>
      </div>)
  }


  return (
    <>
      <Dialog
        open={showview}
        onClose={handleClose}
        scroll='paper'
        fullWidth={true}
        maxWidth='md'
      >
        <DialogTitle >View</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText

            tabIndex={-1}

          >
            <View props={{ id: idd }} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Comment id={idd} showcomment={showcomment} finalclosuredate={topic.topic[0].finalclosuredate} setshowcomment={setshowcomment} />
      <Dialog
        open={showdetail}
        onClose={closeshowdetail}
        scroll='paper'

        fullWidth={true}
        maxWidth='md'
      >
        <DialogTitle id="scroll-dialog-title">Detail {ideadetail.id}</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText

            tabIndex={-1}
          >
            <div className='space-y-4'>
              <p >username : {ideadetail.fullname}</p>
              <p>brief : {ideadetail.brief}</p>
              <p>Filepath : {ideadetail.filepath}</p>
              <p>Content : {ideadetail.text}</p>
              <p>category : {ideadetail.categoryname}</p>
              <p className='date !text-xs'>Date {ideadetail.datetime}</p>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeshowdetail}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <div className='idea-page'>
        {new Date() <= new Date(topic.topic[0].clousuredate) ? <Link to='/addidea' className='create-new' state={{ topicid: id }}>add new idea</Link> : ""}
        {idea.idea.map((idea, i) => {
          if ((params.page ? params.page : 1) == idea.page) {
            return (
              <>
                <div className='idea'>
                  <div className='top'>

                    <p className='font-bold'>{idea.fullname}</p>
                    <p className='font-bold'>{idea.title}</p>

                  </div>
                  <div className='bottom-wrap'>
                    <div className='bottom row'>
                      <p className='flex flex-wrap mb-3 font-semibold'>
                        <button className={`flex w-24 hover:bg-blue-400 justify-center p-2 rounded-md mr-3 border-2 border-solid border-blue-300  ${react.react.filter((e) => e.id == idea.id && e.islike == true)[0] ? "islike" : ""}`} onClick={(e) => { axios.get(`/api/addreact?ideaid=${idea.id}&react=1`) }} >{react.react?.filter((e) => e.id == idea.id)[0] ? react.react?.filter((e) => e.id == idea.id)[0]?.totallike : 0} <AiOutlineLike style={{ marginRight: 4 + "px", marginLeft: 4 + "px", marginTop: 4 + "px" }} />  Like</button>
                        <button className={`flex w-24 hover:bg-red-400  justify-center p-2 rounded-md mr-3 border-2 border-solid border-red-300 ${react.react.filter((e) => e.id == idea.id && e.isdislike == true)[0] ? "isdislike" : ""}`} onClick={(e) => { axios.get(`/api/addreact?ideaid=${idea.id}&react=-1`) }} >{react.react?.filter((e) => e.id == idea.id)[0] ? react.react?.filter((e) => e.id == idea.id)[0]?.totaldislike : 0} <AiOutlineDislike style={{ marginRight: 4 + "px", marginLeft: 4 + "px", marginTop: 4 + "px" }} />  Dislike</button>
                      </p>
                      <div className='options-wrap row font-semibold'>
                        <button className='comment   hover:bg-[#e11d48] hover:text-white' onClick={openshowdetail(idea)} >Detail</button>
                        <button onClick={handleClickOpencomment(idea.id)} className='comment    hover:bg-[#e11d48] hover:text-white'>{count.totalcomment?.filter((e) => e.id == idea.id)[0] ? count.totalcomment.filter((e) => e.id == idea.id)[0]?.count : 0}  comment</button>
                        <button onClick={handleClickOpen(idea.id)} className='comment   hover:bg-[#e11d48] hover:text-white'>{count.totalview?.filter((e) => e.id == idea.id)[0] ? count.totalview.filter((e) => e.id == idea.id)[0]?.count : 0} View</button>
                      </div>

                    </div>

                  </div>


                </div>

              </>
            )
          }


        })}
        <div className="page-wrap">

          {[...Array(idea.idea[idea.idea.length - 1].page)].map((x, i) => {
            return <Link to={`/idea/${id}/${i + 1}`} onClick={(e) => { window.scroll({ top: 0, left: 0, behavior: 'smooth' }) }}> {i + 1}</Link>
          })}
        </div>
      </div>
    </>
  );
}

export default Idea;
