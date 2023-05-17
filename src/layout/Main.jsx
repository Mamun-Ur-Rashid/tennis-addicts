import React from 'react';
import Navbar from '../shared/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../shared/footer/Footer';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;