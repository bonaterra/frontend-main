import { useCallback, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import Carousel from "../../components/atoms/Carousel/Carousel";
import { getAds } from "../../services/ads.service";
import { Ad } from "../../models/IAds";

const TvPage = () => {
  const socketUrl = "ws://localhost:8080";
  const { lastMessage } = useWebSocket(socketUrl);
  const [message, setMessage] = useState<any>();
  const [staticAds, setStaticAds] = useState<Ad | null>(null);
  const [ads, setAds] = useState<Ad[]>([]);

  const getAllAds = useCallback(() => {
    getAds()
      .then((response) => {
        console.log(response);

        const staticAds = response.filter((ad: Ad) => ad.type === "STATIC")[0];
        setStaticAds(staticAds);

        const dynamicAds = response.filter((ad: Ad) => ad.type === "DYNAMIC");
        setAds(dynamicAds);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getAllAds();
    //cada 5 minutos
    const interval = setInterval(() => {
      getAllAds();
    }, 300000);
    return () => clearInterval(interval);
  }, [getAllAds]);

  useEffect(() => {
    if (lastMessage !== null) {
      const responseData = JSON.parse(lastMessage.data);
      console.log(responseData);
      setMessage(responseData.data);
    }
    const timeout = setTimeout(() => {
      setMessage(null);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [lastMessage]);

  return (
    <div className="grid m-0 w-screen h-screen ">
      <div className="col-12 h-8rem flex justify-content-center align-items-center">
        <p className="text-7xl font-bold text-black-alpha-80">
          {message ? (
            "Bienvenido: " + message?.username
          ) : (
            <div className="wrapper">
              <div className="loading-text">
                <p className="text-7xl font-bold text-black-alpha-80">
                  Esperando entrada
                  <span className="dot-one"> .</span>
                  <span className="dot-two"> .</span>
                  <span className="dot-three"> .</span>
                </p>
              </div>
            </div>
          )}
        </p>
      </div>

      <div
        className="grid m-0 p-0  col-12"
        style={{
          height: "calc(100% - 31rem)",
        }}
      >
        <div className=" border-2 border-black-alpha-50 col-5  h-full flex justify-content-center align-items-center">
          <i
            style={{
              fontSize: "10rem",
              color: message ? (message?.status ? "green" : "red") : "gray",
            }}
            className={`pi pi-${
              message
                ? message?.status
                  ? "check"
                  : "times"
                : "spinner pi-spin"
            } `}
          />
        </div>
        <div className="border-1 border-black-alpha-40  col-7  h-full p-0">
          <img
            className="w-full h-full max-h-3"
            src={staticAds?.image ?? "https://via.placeholder.com/1080"}
            alt={message?.username}
          />
        </div>
      </div>

      <div className="col-12  h-22rem p-0">
        <Carousel ads={ads} />
      </div>
    </div>
  );
};

export default TvPage;
