import React, {useContext, useRef} from "react";
import {Context} from "../store/appContext";
import defaultAvatarUrl from "../../img/defaultAvatar.png"
import {Link, useLocation, useNavigate} from "react-router-dom";
import { NuevoViaje } from "./nuevoviaje";

export const SearchC = () => {
	const navigate = useNavigate()
	const {store, actions}= useContext(Context)
	const searchDropdown = useRef()
    const searchInput = useRef()

	const toggleDropdown = ()=> {
		if (!searchDropdown.current.classList.contains("show")) {
			searchDropdown.current.classList.add('show');
		} else {
			searchDropdown.current.classList.remove('show');
		}
	  }
      const handleKeyDown = async (event) => {
        if (event.key === 'Enter' && !searchInput.current.value == "") {
            const response = await actions.searchTravels({ciudad: searchInput.current.value})
            if(response?.data){
                console.log(response.data);
            }else{
                console.log(response.message);
            }
        }
      };

	return (
		<div class="input-group w-50">
            <span class="input-group-text" id="basic-addon1"><i className="fas fa-search"></i></span>
            <input type="email" className="form-control" id="fg-correo" ref={searchInput} placeholder="Ingresa una ciudad" onKeyDown={handleKeyDown} required />
            <span class="input-group-text" id="basic-addon1" role="button" onClick={() => toggleDropdown()}><i className="fas fa-filter"></i></span>
            <div className="nav-item dropdown mx-auto">
                <ul className="dropdown-menu dropdown-menu-bottom" ref={searchDropdown}>
                    <li><Link className="dropdown-item" to={"/perfil/"}><i className="fas fa-user"></i> Prox</Link></li>
                    <li><Link className="dropdown-item" to={"/confperfil/"}><i className="fas fa-cog"></i> Prox</Link></li>
                </ul>
            </div>
        </div>
	);
};
