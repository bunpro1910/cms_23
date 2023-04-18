import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom'


function Navbar() {

  return (
    <div class="navbar">
      <ul class="navbar-list">
        <li class="navbar-item first" >Greenwich FPT</li>
        <div class="second">
          <li class="navbar-item"><Link>Home </Link></li>
          <li class="navbar-item"><Link>Category </Link></li>
          <li class="navbar-item"><Link>Post </Link></li>
          <li class="navbar-item"><Link>View</Link></li>
          <li class="navbar-item"><Link>Login </Link></li>
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
