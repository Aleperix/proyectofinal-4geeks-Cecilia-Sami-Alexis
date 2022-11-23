import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Registro } from "./pages/registro";
import { ConfReg } from "./pages/confreg";
import { Perfil } from "./pages/perfil";
import { Viaje } from "./pages/viaje";
import { RecupClave } from "./pages/recupclave";
import { CodigoClave } from "./pages/codigoclave";
import { CambioClave } from "./pages/cambioclave";
import { Nosotros } from "./pages/nosotros";
import { Preguntas } from "./pages/preguntas";
import { Buscador } from "./pages/buscador";
import { Terminos } from "./pages/terminos";
import { Politicas } from "./pages/politicas";
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
                        <Route element={<Login />} path="/login" />
                        <Route element={<Registro />} path="/register" />
                        <Route element={<ConfReg />} path="/register/confirm" />
                        <Route element={<RecupClave />} path="/forgot"/>
                        <Route element={<CodigoClave />} path="/passcode"/>
                        <Route element={<CambioClave />} path="/changepass"/>
                        <Route element={<Nosotros />} path="/nosotros"/>
                        <Route element={<Viaje />} path="/viaje/:id" />
                        <Route element={<Preguntas />} path="/faq"/>
                        <Route element={<Terminos />} path="/terminos" />
                        <Route element={<Politicas />} path="/politicas" />
						<Route element={<Buscador />} path="/search/:value"/>
                        <Route element={<h1>No encontrado!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
