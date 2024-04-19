import { useState, useEffect, useCallback, useContext } from "react";
import circlePlugIcon from "../assets/icons/circle-plus-icon.svg";
import DownloadComp from "../components/downloadComp";
import { useTranslation } from "react-i18next";
import { OS } from '../utils/getEnv';
import ModalComp from "../components/modalComp";
import { replaceStr } from "../utils/helper";
import { LinksContext } from '../linksContext';
const FeaturedSection = () =>{
    const links = useContext(LinksContext);
    const [os] = useState(OS(window));
    const [osBtn, setOsBtn] = useState("common-btn-win");
    const { t } = useTranslation();
    const [show, setShow] = useState(false);
    const setOpen = useCallback((status)=>{
        setShow(status)
    }, [setShow]);
    useEffect(()=>{
        if(os==="Windows OS"){
            setOsBtn("common-btn-win");
        }else{
            setOsBtn("common-btn-linux");
        }
    },[os])
    return <section id="featured" className="featured-section container">
        <div className="row">
            <div className="fs-48 bold-semi white italic">{t("featured-games")}</div>
        </div>
        <div className="row">
            <div className="col-lg-8 col-md-6 col-sm-12">
                <div className="fs-16 white  m-tb-10">{replaceStr(t("featured-detail"))}</div>
                
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12" style={{textAlign:"right"}}>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-8 col-md-6 col-sm-12">
                <div className="border-32 game-screen"></div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12" style={{textAlign:"right"}}>
                <div className="d-flex flex-column"  style={{gap:'20px'}}>
                    <div className="border-32 d-flex flex-column text-start direct-53"  style={{gap:'20px'}}>
                        <div className="fs-38 white">District 53</div>
                        <div className="ts-16 white">{t("district-detail")}</div>
                        <div className="d-flex justify-content-between" style={{gap:'20px'}}>
                            <div className={`${osBtn} download-btn fs-18 bold-semi white red-btn `} style={{display:"block", width:"100%"}}>
                                {t("install-and-play-now")}
                                <div className="dropdown-content">
                                    <DownloadComp links={links}/>
                                </div>
                            </div>
                            <div onClick={()=>setShow(true)} className="border-circle-icon common-btn-win gray-btn col-2"><img src={circlePlugIcon} alt = "circle plus"/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ModalComp open = {show} setOpen = {setOpen}/>
    </section>
}
export default FeaturedSection;