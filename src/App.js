
import { useState, useEffect } from "react";
import Clear from "./assets/clear.jpg";
import Cloudy from "./assets/cloudy.jpg";
import Overcast from "./assets/overcast.jpg";
import Rainy from "./assets/rainy.jpg";
import Snow from "./assets/snow.jpg";
import { AiOutlineSearch } from 'react-icons/ai';


function App() {
  const [place, setPlace] = useState("London");
  const [placeInfo, setPlaceInfo] = useState({});

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=abf00a491ea041d388d155613222906&q=${place}&days=1&aqi=no&alerts=no`
    )
      .then((response) => response.json())
      .then((data) =>
        setPlaceInfo({
          name: data.location.name,
          country: data.location.country,
          celsius: {
            current: data.current.temp_c,
            high: data.forecast.forecastday[0].day.maxtemp_c,
            low: data.forecast.forecastday[0].day.mintemp_c
          },
          condition: data.current.condition.text
        })
      );

    setPlace("");
  };

  console.log(`abf00a491ea041d388d155613222906`)

  return (
    <div
      className="h-screen w-screen bg-no-repeat bg-center bg-cover relative font-sans bg-white duration-100 overflow-hidden "
      style={
        placeInfo.condition?.toLowerCase() === "clear" ||
          placeInfo.condition?.toLowerCase() === "sunny"
          ? { backgroundImage: `url(${Clear})` }
          : placeInfo.condition?.includes("cloudy")
            ? { backgroundImage: `url(${Cloudy})` }
            : placeInfo.condition?.toLowerCase().includes("rainy")
              ? { backgroundImage: `url(${Rainy})` }
              : placeInfo.condition?.toLowerCase().includes("snow")
                ? { backgroundImage: `url(${Snow})` }
                : { backgroundImage: `url(${Overcast})` }
      }
    >
      <div className="px-2 flex items-center  justify-center flex-row absolute border-1 bg-white border shadow-md rounded-full mt-4 w-1/4 mr-auto ml-auto bg-transparent overflow-hidden right-2  ">
        <input
          className="rounded-l-sm w-full py-2 px-6 text-white leading-tight focus:outline-none bg-transparent flex"
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}

        />
        <AiOutlineSearch
          onClick={handleFetch}
          fontSize="large"
          className="bg-transparent text-white rounded-full p-2 hover:bg-red-400 focus:outline-none w-12 h-12 flex items-center justify-center"
        />
      </div>
      <div className="mt-3 w-1/4 mr-auto ml-auto text-white absolute flex items-center justify-center flex-row left-2.5">
        <div className="absolute flex items-center justify-center flex-row left-12 top-5 text-lg w-max">
          <h1 className="text-5xl m-2 py-5  w-max relative">{placeInfo.celsius?.current}° C</h1>
          <div className="ml-6 w-1/4 mr-auto top-8 mb-8 relative ">
            <h1>{placeInfo.condition}</h1>
            <h1>{placeInfo.celsius?.high}° C</h1>
            <h1>{placeInfo.celsius?.low}° C</h1>
          </div>
        </div>
        <h2 className="text-3xl pl-4 flex items-center justify-center relative m-4  top-40">
          {placeInfo.name}, {placeInfo.country}
        </h2>
      </div>
    </div>
  );
}

export default App;