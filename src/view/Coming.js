import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Marquee from "react-fast-marquee";
import axios from "axios";
import { OS } from "../utils/getEnv";
import GameCard from "../components/gameCard";
import { replaceStr } from "../utils/helper";
import logoImg from "../assets/logos/game-logo.svg";

const Coming = () => {
  const { t } = useTranslation();

  const [os] = useState(OS(window));
  const [osBtn, setOsBtn] = useState("common-btn-win");
  const [gamePagination, setGamePagination] = useState(null);

  const fetchFeaturedGameList = async (query = { page: 1, limit: 72, sort: '{"downloadCount":-1}' }) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/game/featured`, { params: query });
      console.log(res.data);
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.error ?? "Failed to fetchFeaturedGameList");
    }
  };

  useEffect(() => {
    if (os === "Windows OS") {
      setOsBtn("common-btn-win");
    } else {
      setOsBtn("common-btn-linux");
    }
  }, [os]);

  useEffect(() => {
    fetchFeaturedGameList()
      .then((res) => {
        setGamePagination(res);
      })
      .catch((err) => {
        setGamePagination(null);
        console.error(err);
      });
  }, []);

  return (
    <section id="coming-soon" className="coming-soon container">
      <div className="coming-soon-container d-flex flex-column text-center justify-content-center align-items-center">
        {!gamePagination?.data?.length && (
          <>
            <div>
              <img src={logoImg} alt="logo" />
            </div>
            <div className="fs-48 white-oppacity italic bold">{t("more-games")}!</div>
            <div className="fs-14 white mt-4">{t("comming-detail-1")}</div>
            <div className="fs-14 white">{replaceStr(t("comming-detail-2"))}</div>
          </>
        )}
        {gamePagination?.data?.length > 0 && (
          <div style={{ width: "100vw", overflow: "hidden" }} className="d-flex flex-column justify-content-center align-items-center">
            <Marquee pauseOnHover={true} gradient={true} gradientColor={[0, 0, 0, 100]} direction="left">
              {gamePagination.data.slice(0, 24).map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </Marquee>
            <Marquee pauseOnHover={true} gradientColor={[0, 0, 0, 0]} direction="right">
              {gamePagination.data.slice(24, 48).map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </Marquee>
            <Marquee pauseOnHover={true} gradientColor={[0, 0, 0, 0]} direction="left">
              {gamePagination.data.slice(48, 72).map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </Marquee>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "40px", gap: "24px" }}>
          <div className="fs-38 white">List your game with us. It's free!</div>
          <a href="https://forms.gle/xuMe6vdf9JYAgsNB8" className={`${osBtn} download-btn red-btn fs-18 bold-semi white`}>
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};
export default Coming;
