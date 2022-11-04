import React, {useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Perfil } from "./pages/perfil";
import { ConfPerfil } from "./pages/confperfil";
import { Viaje } from "./pages/vistaviajes";
import { NuevoViaje } from "./pages/nuevoviaje";
import { RecupClave } from "./pages/recupclave";
import { CambioClave } from "./pages/cambioclave";
import injectContext from "./store/appContext";


import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    // const location = useLocation();
    // console.log(location.pathname);
    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/"/>
                        <Route element={<Perfil />} path="/perfil/:id" />
                        <Route element={<ConfPerfil />} path="/confperfil/:id" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<RecupClave />} path="/forgot"/>
                        <Route element={<CambioClave />} path="/cambioclave"/>
                        <Route element={<Viaje />} path="/vistaviajes/:id" />
                        <Route element={<NuevoViaje />} path="/nuevoviaje" />
                        <Route element={<h1>No encontrado!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
