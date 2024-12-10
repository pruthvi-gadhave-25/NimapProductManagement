import React from 'react'
import { Link   } from 'react-router-dom'

function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-2">
    <a className="navbar-brand" href="#"><h3>Product App</h3></a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse d-flex justify-content-between " id="navbarColor01">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link to='/' className="nav-link" href="#">Home </Link>
        </li>
        <li className="nav-item">
          <Link to='/products' className="nav-link" href="#">Products</Link>
        </li>
        <li className="nav-item">
          <Link to='/category'  className="nav-link" href="#">Cataegory</Link>
        </li>
       
      </ul>
     <section >
     <form className="form-inline d-flex ">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-info my-2 my-sm-0" type="submit" fdprocessedid="sbxho">Search</button>
      </form>
     </section>
    </div>
  </nav>
    </div>
  )
}

export default Header