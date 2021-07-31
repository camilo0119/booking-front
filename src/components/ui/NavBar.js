import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startLogout } from "../../actions/auth";

const NavBar = () => {
  const { name } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <span className="navbar-brand">{name}</span>

      <button
        class="navbar-toggler d-sm-none d-block"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
            <li class="nav-item active">
                <Link class="nav-link" to="/">Inicio <span class="sr-only">(current)</span></Link>
            </li>
            <li class="nav-item dropdown">
                <span type="button" class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Reservas
                </span>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Something else here</a>
                </div>
            </li>
            <li class="nav-item dropdown">
                <span type="button" class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Administración
                </span>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link class="dropdown-item" to="/apartment-register">Registrar Apartamento</Link>
                    <Link class="dropdown-item" to="/season-register">Registrar Temporada</Link>
                </div>
            </li>
            {/* <li class="nav-item">
                <a class="nav-link" href="#">Administración</a>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" href="#">Disabled</a>
            </li> */}
        </ul>
        {/* <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form> */}
    </div>

      <button className="btn btn-outline-danger d-none d-lg-block d-xl-block d-sm-block" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i>
        <span> Salir</span>
      </button>
    </nav>
  );
};

export default NavBar;
