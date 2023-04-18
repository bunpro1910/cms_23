

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AiOutlineLike } from 'react-icons/ai';

function Home() {
  let [showview, setshowview] = useState(false)
  let [showcomment, setshowcomment] = useState(false)
  useEffect(() => {


  }, [showview])
  return (
    <div className='mt-4 w-full relative'>
      <div className=''>
        <div className=' w-full bg-black opacity-50 absolute top-0 bottom-0 z-2' ></div>
        <img src="https://secretldn.com/wp-content/uploads/2022/10/shutterstock_742274224-2.jpg" alt="Placeholder Image" className="w-full  " />
        <div className="absolute w-full top-1/3 bottom-auto sm:text-3xl xl:text-4xl font-extrabold text-white">
          <h1 className='mb-10'>Welcome to My Group 23 CMS website</h1>
          <Link to='/topic' className="p-3 bg-rose-600 rounded-2xl sm:text-2xl xl:text-3xl hover:bg-rose-700 hover:no-underline hover:text-white transition-all duration-500">View Topic</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
