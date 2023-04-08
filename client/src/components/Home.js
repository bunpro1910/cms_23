

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AiOutlineLike } from 'react-icons/ai';

function Home() {
  let [showview, setshowview] = useState(false)
  let [showcomment, setshowcomment] = useState(false)
  useEffect(() => {


  }, [showview])
  return (
    <div className='home-page'>

      <section class="hero bg-light" >
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <h1>Welcome to My Group CMS website</h1>
              <p>Group 23 CMS web</p>
              <a href="#" class="btn btn-primary">View Topic</a>
            </div>
            <div class="col-lg-6">
              <img src="https://secretldn.com/wp-content/uploads/2022/10/shutterstock_742274224-2.jpg" alt="Placeholder Image" class="img-fluid" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
