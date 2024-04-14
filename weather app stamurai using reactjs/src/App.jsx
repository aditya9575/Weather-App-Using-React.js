import React, { useState } from 'react'
import Search from './components/search/search'
import CurrentWeather from './components/current-weather/currentWeather'
import ForeCast from './components/forecast/forecast'
import "./App.css"
import { WEATHER_API_URL , WEATHER_API_KEY } from './api'


const App = () => {

  //using useState to keep a track of currentWeather and forecast
  const[currentWeather, setCurrentWeather]=useState(null);
  const[forecast, setForecast]=useState(null);


//this function is getting the search data that is being entered in our component and its simply logging what is entered   
const handleOnSearchChange = (searchData) =>{

  //here we destructure the values being fetched as a response from the fetch call and extract the latitude & longitude 
const [lat , lon] = searchData.value.split(/\s+/);



// now we use promises to make 2 api calls 1 for current weather and 2 for weather forecast 

//First fetch call to current weather 
const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
//Second fetch call to weather forecast
const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

Promise.all([currentWeatherFetch , forecastFetch])
      .then( async (response) =>{
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();


      // calling set functions to update the weather 
      setCurrentWeather({city: searchData.label, ...weatherResponse});
      setForecast({city: searchData.label, ...forecastResponse});
      })
      .catch((error)=>{
        console.log(error);
      })

}
  
//for testing the fetch functionality
console.log(currentWeather);
console.log(forecast);

  return (
    <div className='container'>

<h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>WeatherWise</h1>
<p style={{ textAlign: 'center' }}>How's The Weather?</p>


<Search onSearchChange={handleOnSearchChange}/>

{/* this below check condition implies that if currentweather and forecast data is there then only we pass it to the 
element for rendering */}
{currentWeather && <CurrentWeather data={currentWeather} />}
{forecast && <ForeCast data={forecast} />}


    </div>
  )
}

export default App