import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';


const Navibar = () => {
  let navigate = useNavigate();
  const handlelogout=()=>{
    localStorage.removeItem('token')
    navigate("/login")
  }
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname)
  }, [location]);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Nexiqor</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/home"?"active":""}` } aria-current="page" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"?"active":""}` } to="/about">About</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/">Action</Link></li>
                  <li><Link className="dropdown-item" to="/">Another action</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link disabled" aria-disabled="true">Disabled</Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex" >
            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
          <Link className="btn btn-secondary mx-2" to="/signup" role="button">Sign Up</Link>
            </form>:<button onClick={handlelogout} className="btn btn-primary"> logout</button>}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navibar;
