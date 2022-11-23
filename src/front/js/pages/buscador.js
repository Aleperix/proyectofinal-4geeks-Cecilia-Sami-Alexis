import React, { useContext, useLayoutEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";
export const Buscador = () => {
	const { store, actions } = useContext(Context);
    const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10)); //Fecha en formato yyyy-mm-dd

	const [searchInput, setSearchInput] = useState()
	const [searchData, setSearchData] = useState([])
	const [noData, setNoData] = useState()

	const searchValue = useParams()
	const location = useLocation();
	

	const handleSearch = async (value) => {
		history.pushState({}, null, "/search/"+value)
        const response = await actions.searchTravels({ciudad: value})
		if(response?.data){
			setSearchData(response.data)
			setNoData(false)
			console.log(response.data);
		}else{
			setSearchData([])
			setNoData(true)
			console.log(response.message);
		}
	};

	const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !searchInput == "") {
			handleSearch(searchInput)
        }
	};

	useLayoutEffect(() => {
		setSearchInput(searchValue.value)
		handleSearch(searchValue.value)
	}, [location]);
	
	console.log(noData);

	return (
		<div className="container">
            
			<nav className="navbar bg-light my-5">
            <h3 className="d-flex justify-content-center w-100">¿Algún lugar en especial?</h3>
				<div className="container-fluid">
					<form className="d-flex justify-content-center w-100" role="search" onSubmit={(e) => e.preventDefault()}>
						<input value={searchInput} className="form-control me-2" type="text" placeholder="Ciudad" aria-label="Search" onChange={(e) => setSearchInput(e.target.value)} onKeyDown={(e) => handleKeyDown(e)}/>
						<button className="btn btn-outline-primary mx-2" type="button" onClick={() => handleSearch(searchInput)}>
							Buscar
						</button>
					</form>
					{searchData.length != 0 ?
					<div className="card w-100 my-3">
						<ul className="list-group list-group-flush">
							{searchData?.map((element, i) => {
								return (
									<li className="list-group-item  align-items-center" key={i} role="button">
										<Link to={"/viaje/"+element.id} className="text-decoration-none text-dark">
											<div className="d-flex flex-row flex-wrap flex-sm-wrap flex-md-wrap justify-content-between">
												<div className="d-flex align-items-center justify-content-start col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 text-break">
													{element.desde} <i className="fas fa-chevron-right mx-1"></i> {element.hasta}
												</div>
												<div className="d-flex align-items-center justify-content-start justify-content-sm-start justify-content-md-start col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
													<i className="fas fa-calendar-alt mx-1"></i> {String(element.fecha).substring(6, 8)+"/"+String(element.fecha).substring(4, 6)+"/"+String(element.fecha).substring(0, 4)}
												</div>
												<div className="d-flex align-items-center justify-content-start justify-content-sm-start justify-content-md-start col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
													<i className="fas fa-clock mx-1"></i> {String(element.hora).substring(0, 2)+":"+String(element.hora).substring(2, 4)}
												</div>
												<div className="d-flex align-items-center justify-content-start justify-content-sm-start justify-content-md-start col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
													<i className="fas fa-money-bill-wave mx-1"></i> {element.costo_asiento_uy}
												</div>
											</div>
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
					:
					<p className="d-flex mx-auto">No hay viajes disponibles para esa ciudad</p>
					}
				</div>
			</nav>
		</div>
	);
};
