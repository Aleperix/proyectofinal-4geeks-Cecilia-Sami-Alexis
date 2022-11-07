import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { ErrorPage } from "../component/errorpage";
import defaultAvatarUrl from "../../img/defaultAvatar.png"
import { Context } from "../store/appContext";

export const Perfil = () => {
	const {store, actions} = useContext(Context);
	const [datosPerfil, setDatosPerfil] = useState("");
	const [viajesConductor, setViajesConductor] = useState([]);
	const [viajesAcompanante, setViajesAcompanante] = useState([]);
	const [edad, setEdad] = useState("");
	const profileid = useParams()
	const avatarFile = useRef();
	const avatarUrl = useRef();
	const remoteAvatarTab = useRef();
	const localAvatarTab = useRef();
	const [localTab, setlocalTab] = useState();
	
	const getProfileData = async (id) => {
		const response = await actions.getProfile(id)
		if (response.status == 200){
			const edad = getAge(String(response.perfil.fecha_nacimiento))
			setDatosPerfil(response.perfil, {status: response.status})
			setViajesConductor(response.viajes.conductor)
			setViajesAcompanante(response.viajes.acompanante)
			setEdad(edad)
			return null
		}
		console.log(response.data, {status: response.status});
		setDatosPerfil(response.data, {status: response.status})
		return null
	}
	
	function getAge(fechaNac) {
		let hoy = new Date();
		let fechaNacUsr = new Date(fechaNac);
		let edad = hoy.getFullYear() - fechaNacUsr.getFullYear();
		let m = hoy.getMonth() - fechaNacUsr.getMonth();
		if (m < 0 || (m === 0 && hoy.getDate() < fechaNacUsr.getDate())) {
			edad--;
		}
		return edad;
	}

	const tabClick = (e) =>{
		if (e == remoteAvatarTab.current) {
			setlocalTab(true)
	  	}else if(e == localAvatarTab.current){
		  	setlocalTab(false)
	  	}
	}

	function onAvatarFileChange() {
		console.log(avatarFile.current.files[0]);
	};

	const onUploadConfirm = async (opt) => {
		const data = new FormData()
		if (opt == 'url'){
			data.append("image", avatarUrl.current.value)
		}else{
			data.append("image", avatarFile.current.files[0])
		} 
		let response = await actions.postData('https://api.imgur.com/3/image',data , {Authorization: 'Client-ID de65600da46b2c7'})
		response = response.data
		console.log(response.data.link);
	}

	useEffect(() => {
		getProfileData(profileid.id)
	}, []);
	return (
		<>
		{store.auth ?
		store.error !== 404 ?
			<div className="container">
				<div className="mt-5 mx-5" id="profile">
					<div className="container bg-light bg-opacity-25 rounded border border-secondary d-flex justify-content-between align-items-center">
						<h1 className="h2 my-2">Perfil de {datosPerfil.nombre_usuario}</h1>
						{store.usuario.id == datosPerfil.id ?
							<>
							<img className="my-2 border border-2 rounded-circle" data-bs-toggle="modal" data-bs-target="#changeProfileImage" onClick={() => tabClick(remoteAvatarTab.current)} src={datosPerfil.url_avatar == null ? defaultAvatarUrl : store.usuario.url_avatar} width="10%" role="button" alt="Imagen de Perfil" />
							</>
						: 
							<img className="my-2 border border-2 rounded-circle" src={datosPerfil.url_avatar == null ? defaultAvatarUrl : datosPerfil.url_avatar} width="10%" alt="Imagen de Perfil" />
						}
					</div>
					{store.usuario.id == datosPerfil.id ?
					<div className="mx-4 py-2 bg-secondary bg-opacity-25 border-start border-end border-secondary h-100" id="my-profile-config">
						<div className="my-4 d-flex justify-content-center">
							<Link className="d-block text-decoration-none m-2" to={"/confperfil/"+store.usuario.id}>Editar datos personales</Link>
						</div>
					</div>
					:
					<div className="mx-4 py-2 bg-secondary bg-opacity-25 border-start border-end border-secondary h-100" id="my-profile-config">
						<div className="my-4 d-flex justify-content-center">
							<button className="btn btn-secondary d-block m-2">Contactar</button>
						</div>
					</div>}
				</div>
				<div className="mx-5" id="personal-info">
					<div className="container bg-light bg-opacity-25 rounded border border-secondary d-flex justify-content-between align-items-center">
						<h4 className="h4 my-2">Información Personal</h4>
						<i className="h4 fas fa-user"></i>
					</div>
					<div className="mx-4 py-2 bg-secondary bg-opacity-25 border-start border-end border-secondary h-100" id="my-profile-config">
						<div className="my-4">
							<div className="row d-flex flex-xs-wrap flex-sm-wrap flex-md-wrap justify-content-center">
								<div className="col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
									<span className="d-block m-2 text-break"><b>Usuario: </b>{datosPerfil.nombre_usuario}</span>
									<span className="d-block m-2 text-break"><b>Nombre: </b>{datosPerfil.nombre}</span>
									<span className="d-block m-2 text-break"><b>Apellido: </b>{datosPerfil.apellido}</span>
									<span className="d-block m-2 text-break"><b>Correo Electrónico: </b>{datosPerfil.correo}</span>
									<span className="d-block m-2 text-break"><b>Ciudad: </b>{datosPerfil.ciudad}</span>
								</div>
								<div className="col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
									<span className="d-block m-2 text-break"><b>Edad: </b>{edad}</span>
									<span className="d-block m-2 text-break"><b>Género: </b>{datosPerfil.genero}</span>
									<span className="d-block m-2 text-break"><b>Preferencias para viajar: </b>{datosPerfil.preferencias}</span>
									<span className="d-block m-2 text-break"><b>Sobre mi: </b>{datosPerfil.acerca}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				{store.usuario.id == datosPerfil.id ?
				<div className="mx-5" id="travels">
					<div className="container bg-light bg-opacity-25 rounded border border-secondary d-flex justify-content-between align-items-center">
						<h4 className="h4 my-2">Mis Viajes</h4>
						<i className="h4 fas fa-map-marked-alt"></i>
					</div>
					<div className="mx-4 py-2 bg-secondary bg-opacity-25 border-start border-end border-secondary h-100" id="my-profile-config">
						<h3 className="text-center">Como conductor</h3>
						{viajesConductor.hasOwnProperty('message') ?
						<div className="my-1 d-flex justify-content-center">
							<p className="m-2 d-flex justify-content center">{viajesConductor.message}</p>
						</div>
						:
						<div className="my-4 d-flex justify-content-center">
							<div className="table-responsive">
								<table className="table table-striped text-center mx-5">
									<thead>
										<tr>
										<th scope="col-1">#</th>
										<th scope="col-1">Desde</th>
										<th scope="col-1">Hasta</th>
										<th scope="col-1">Fecha</th>
										<th scope="col-1">Hora</th>
										<th scope="col-1">Vehículo</th>
										</tr>
									</thead>
									<tbody>
									{viajesConductor? viajesConductor.map((element, index) => {
											return(
											<tr key={index+1}>
											<th scope="row">{index+1}</th>
											<td>{element.desde}</td>
											<td>{element.hasta}</td>
											<td>{element.fecha}</td>
											<td>{element.hora}</td>
											<td>{datosPerfil.vehiculos[index].modelo}</td>
											</tr>
									)}):null}
									</tbody>
									</table>
								</div>
						</div>
						}
						<h3 className="text-center">Como acompañante</h3>
						{viajesAcompanante.hasOwnProperty('message') ?
						<div className="my-1 d-flex justify-content-center">
							<p className="m-2 d-flex justify-content center">{viajesAcompanante.message}</p>
						</div>
						:
						<div className="my-4 d-flex justify-content-center">
							<div className="table-responsive">
								<table className="table table-striped text-center mx-5">
									<thead>
										<tr>
										<th scope="col-1">#</th>
										<th scope="col-1">Desde</th>
										<th scope="col-1">Hasta</th>
										<th scope="col-1">Fecha</th>
										<th scope="col-1">Hora</th>
										{/* <th scope="col-1">Vehículo</th> */}
										<th scope="col-1">Conductor</th>
										</tr>
									</thead>
									<tbody>
									{viajesAcompanante.map((element, index) => {
											return(
											<tr key={index+1}>
											<th scope="row">{index+1}</th>
											<td>{element.desde}</td>
											<td>{element.hasta}</td>
											<td>{element.fecha}</td>
											<td>{element.hora}</td>
											{/* <td>{vehiculos[index].modelo}</td> */}
											<td>{element.conductor}</td>
											</tr>
									)})}
									</tbody>
									</table>
								</div>
						</div>
						}
					</div>
				</div>
				:
				false}
				<div className="mx-5" id="vehicles">
					<div className="container bg-light bg-opacity-25 rounded border border-secondary d-flex justify-content-between align-items-center">
						<h4 className="h4 my-2">{store.usuario.id == datosPerfil.id ? "Mis Vehículos" : "Vehículos"}</h4>
						<i className="h4 fas fa-space-shuttle"></i>
					</div>
					<div className="mb-2 mx-4 py-2 bg-secondary bg-opacity-25 rounded-bottom border-start border-end border-bottom border-secondary h-100" id="my-profile-config">
						{datosPerfil.vehiculos.hasOwnProperty('status') ?
						<div className="my-4 d-flex justify-content-center">
							<p className="d-block m-2 d-flex justify-content center">{store.usuario.id == datosPerfil.id ? "Aún no tienes vehículos" : "El usuario aún no tiene vehículos"}</p>
						</div>
							:
							<div className="my-4">
								<div className="table-responsive">
									<table className="table table-striped text-center mx-5">
										<thead>
											<tr>
											<th scope="col-1">#</th>
											<th scope="col-1">Modelo</th>
											<th scope="col-1">Kilómetros por litro</th>
											<th scope="col-1">Cantidad de asientos</th>
											</tr>
										</thead>
										<tbody>
										{datosPerfil.vehiculos.map((element, index) => {
											return(
											<tr key={index+1}>
											<th scope="row">{index+1}</th>
											<td>{element.modelo}</td>
											<td>{element.kms_por_litro}</td>
											<td>{element.cantidad_asientos}</td>
											</tr>
										)})}
										</tbody>
									</table>
								</div>
							</div>
						}
						</div>
					</div>
					<div className="modal fade" id="changeProfileImage" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="changeProfileImageLabel" aria-hidden="true">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h1 className="modal-title fs-5" id="changeProfileImageLabel">Cambiar Imagen de Perfil</h1>
								</div>
								<div className="modal-body">
									<ul className="nav nav-tabs" role="tablist">
										<li className="nav-item">
										<button className={localTab ? "nav-link active" : "nav-link"} id="remoteImageUpload-tab" ref={localAvatarTab} onClick={() => tabClick(remoteAvatarTab.current)} data-bs-toggle="tab" data-bs-target="#remoteImageUpload" type="button" role="tab" aria-controls="remoteImageUpload" aria-selected="false">Local</button>
										</li>
										<li className="nav-item">
											<button className={!localTab ? "nav-link active" : "nav-link"} id="localImageUpload-tab" ref={remoteAvatarTab} onClick={() => tabClick(localAvatarTab.current)} data-bs-toggle="tab" data-bs-target="#localImageUpload" type="button" role="tab" aria-controls="localImageUpload" aria-selected="true">Remota</button>
										</li>
									</ul>
									<div className="tab-content mt-4">
										{localTab ?
  										<div className="tab-pane fade show active" id="localImageUpload" role="tabpanel" aria-labelledby="localImageUpload-tab">
										  	<div className="input-group mb-3">
												<label className="input-group-text" htmlFor="inputFile"><i className="fas fa-upload"></i></label>
												<input type="file" className="form-control" ref={avatarFile} onChange={onAvatarFileChange} id="inputFile"/>
											</div>
										</div>
										:
										<div className="tab-pane fade show active" id="remoteImageUpload" role="tabpanel" aria-labelledby="remoteImageUpload-tab">
											<div className="input-group mb-3">
												<label className="input-group-text" htmlFor="inputLink"><i className="fas fa-link"></i></label>
												<input type="text" className="form-control" ref={avatarUrl} id="inputLink" placeholder="Ingresa la URL de la imagen"/>
											</div>
										</div>
										}
									</div>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
									<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={!localTab ? () => onUploadConfirm('url') : () => onUploadConfirm('file')}>Confirmar</button>
								</div>
							</div>
						</div>
					</div>
			</div>
			:
			<ErrorPage errorStatus={store.error} errorMessage={datosPerfil.message}/>
			:
			<ErrorPage errorStatus={'401'} errorMessage={'No tienes permitido estar aquí'}/>}
		</>
	);
};