import React from "react";
import { useLocation, BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Login } from "./pages/login";
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
    console.log(window.location.pathname);
    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    {window.location.pathname != "/login" ?
                        <Navbar />:
                        null
                    }
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    {window.location.pathname != "/login" ?
                        <Footer />:
                        null
                    }
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
