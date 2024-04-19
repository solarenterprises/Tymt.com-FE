import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import { LinksContext } from '../linksContext';

const MainLayout = () => {
    const releaseAPI = 'https://dev.tymt.com/api/releases';
    const [links, setLinks] = useState([]);

    useEffect(() => {
        // GET request
        axios.get(releaseAPI)
          .then(response => {
            let release = response.data.result.data[0]?response.data.result.data[0]: {};
            if (release?.downloadLinks) {
                setLinks(release?.downloadLinks)
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }, []);
    return(
        <LinksContext.Provider value={links}>
            <div id="app" className='body'>
                <Header/>
                <div style={{minHeight: "calc(100vh - 145px)", display:'flex', flexDirection: 'column',}}>
                    <Outlet/>
                </div>
                <Footer/>
            </div>
        </LinksContext.Provider>
    )
}

export default MainLayout;