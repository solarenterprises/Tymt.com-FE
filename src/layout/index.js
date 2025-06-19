import React, { useState, useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import { LinksContext } from "../linksContext";

const MainLayout = () => {
  // const releaseAPI = "https://tymt.com/api/uploads/release.json";
  const [links, setLinks] = useState([
    { "platformName": "Windows", "link": "https://github.com/solarenterprises/tymt-launcher-client-tauri/releases/download/v2.2.2/tymtLauncher_2.2.2_x64_en-US.msi" },
    { "platformName": "Linux", "link": "https://github.com/solarenterprises/tymt-launcher-client-tauri/releases/download/v2.2.2/tymtLauncher_2.2.2_amd64.AppImage" },
    { "platformName": "mac-apple", "link": "https://github.com/solarenterprises/tymt-launcher-client-tauri/releases/download/v2.2.2/tymtLauncher_aarch64.app.tar.gz" },
    { "platformName": "mac-intel", "link": "https://github.com/solarenterprises/tymt-launcher-client-tauri/releases/download/v2.2.2/tymtLauncher_x64.app.tar.gz" }
  ]);

  // useEffect(() => {
  //   // GET request
  //   axios
  //     .get(releaseAPI)
  //     .then((response) => {
  //       let release = response.data.result.data[0] ? response.data.result.data[0] : {};
  //       if (release?.downloadLinks) {
  //         setLinks(release?.downloadLinks);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  return (
    <LinksContext.Provider value={links}>
      <div id="app" className="body">
        <Header />
        <div style={{ minHeight: "calc(100vh - 145px)", display: "flex", flexDirection: "column" }}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </LinksContext.Provider>
  );
};

export default MainLayout;
