import { useState, useEffect } from "react";
import winIcon from "../assets/icons/win-icon.svg";
import linuxIcon from "../assets/icons/linux-icon.svg";
import macIcon from "../assets/icons/mac-icon.svg"
import { useTranslation } from "react-i18next";

import { OS } from "../utils/getEnv";

const DownloadComp = (props) => {
    const [windowLink, setWindowLink] = useState("");
    const [linuxLink, setLinuxLink] = useState("");
    const [macOSLink, setMacOSLink] = useState("");
    const [os] = useState(OS(window));
    const { t } =  useTranslation();
    const [osBtn, setOsBtn] = useState("common-btn-win");
    useEffect(()=>{
        if(os==="Windows OS"){
            setOsBtn("common-btn-win");
        }else{
            setOsBtn("common-btn-linux");
        }
    },[os]);
    useEffect(()=>{
        if (props.links && props.links.length > 0) {
            if (props.links[0]) {
                switch (props.links[0].platformName) {
                    case "Windows":
                        setWindowLink(props.links[0].link);
                        break;
                    case "Linux":
                        setLinuxLink(props.links[0].link);
                        break;
                    case "macOS":
                        setMacOSLink(props.links[0].link);
                        break;
                    default:
                        break;
                }
            }
            if (props.links[1]) {
                switch (props.links[1].platformName) {
                    case "Windows":
                        setWindowLink(props.links[1].link);
                        break;
                    case "Linux":
                        setLinuxLink(props.links[1].link);
                        break;
                    case "macOS":
                        setMacOSLink(props.links[1].link);
                        break;
                    default:
                        break;
                }
            }
            if (props.links[2]) {
                switch (props.links[2].platformName) {
                    case "Windows":
                        setWindowLink(props.links[2].link);
                        break;
                    case "Linux":
                        setLinuxLink(props.links[2].link);
                        break;
                    case "macOS":
                        setMacOSLink(props.links[2].link);
                        break;
                    default:
                        break;
                }
            }
        }
    },[props.links]);
    return(
        <div className={`download`}>
            <div className='download-item action-button'>
                <a href={linuxLink} target='_blank' rel="noreferrer">
                    <div className="d-flex justity-content-center align-items-center">
                        <div><img src={linuxIcon} alt="linux download"/></div>
                        <div className={`${osBtn} fs-18 white`}>{t("download-for-linux")}</div>
                    </div>
                </a>
            </div>
            <div className='down-divider'></div>
            <div className='download-item action-button'>
                <a href={windowLink} target='_blank' rel="noreferrer">
                    <div className="d-flex justity-content-center align-items-center">
                        <div><img src={winIcon} alt="win download"/></div>
                        <div className={`${osBtn} fs-18 white`}>{t("download-for-windows")}</div>
                    </div>
                </a>
            </div>
            <div className='down-divider'></div>
            <div className='download-item action-button'>
                <a href={macOSLink} target='_blank' rel="noreferrer">
                    <div className="d-flex justity-content-center align-items-center">
                        <div><img src={macIcon} alt="mac download"/></div>
                        <div className={`${osBtn} fs-18 white`}>{t("download-for-mac")}</div>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default DownloadComp;