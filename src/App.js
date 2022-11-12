import axios from 'axios';
import React, {useState} from 'react';


function App() {

  const [place, setPlace] = useState('');
  const [placeInfo, setPlaceInfo] = useState({});
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=b0254f57125b747e14e5f553029e6747`


 const location = (event) => {
  if (event.key === 'Enter') {
    axios.get(url).then((response) => {
      setPlaceInfo(response.data)
      console.log(response.data)
      
    })
    setPlace('')
  }
}

  return ( 
    <div className="app" >
    <div className="search-box">
      <input
      value={place}
      onChange={event => setPlace(event.target.value)}
      onKeyPress={location}
      placeholder='Enter Location'
      type="text" 
     />
      
    </div>

    <div className="container">
      <div className="top">
        <div className="location">
          <p>{placeInfo.name} </p> 
        </div>
        <div className="temp">
        {placeInfo.main ? <h1>{placeInfo.main.temp.toFixed()}°C</h1> : null}
        </div>
        <div className="description">
        {placeInfo.weather ? <p>{placeInfo.weather[0].main}</p> : null}
        </div>
      </div>

    <div className="bottom">
    <div className="feels">
              {placeInfo.main ? <p className='bold'>{placeInfo.main.temp_max.toFixed()}°C</p> : null}
              <p>Max Temp</p>
            </div>
            <div className="humidity">
              {placeInfo.main ? <p className='bold'>{placeInfo.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {placeInfo.wind ? <p className='bold'>{placeInfo.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
      </div>
    </div>
 </div>
    </div> 
 );
} 
 
export default App;
