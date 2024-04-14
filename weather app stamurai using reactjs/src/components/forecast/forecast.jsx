import React from "react";
import {
  Accordion,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItem,
  AccordionItemButton,
} from "react-accessible-accordion";

import "./forecast.css"

// array for week day names
const WEEK_DAYS = ["Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday" , "Sunday"];

const ForeCast = ({ data }) => {

// this returns a number and if its 2nd day so we cut first 2 days and make array of the next days left + current days passed     
const dayInAWeek = new Date().getDay();
const forecastDays = WEEK_DAYS.slice(dayInAWeek , WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

//testing to see if this days splicing worked 
// console.log(forecastDays);

  return (
    <div>
      <label className="title"> Daily </label>
      {/* this allowZeroExpanded method allows all the accordions to be closed and only open when tapped on */}
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
    {/* this part accordianItemHeading is the part that you'll see once the code is collapsed */}
            <AccordionItemHeading>
                <AccordionItemButton>
                     {/* we want to print the day name here the image of the day and maximum temprature */}
                     <div className="daily-item">
                        <img src={`icons/${item.weather[0].icon}.png`} alt="weather" className="icon-small" />
     {/* this below will display the days using the array that we got from slicing overall the intent is to get the left over days
      data and then append the precious days that have been passed . again back to this new array so we get the data of a week
       starting from any day   */}
                        <label className="day">{forecastDays[idx]}</label>
                        <label className="description">{item.weather[0].description}</label>
                        <label className="min-max">{Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C</label>

                     </div>
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                <div className="daily-details-grid">
                   
                   <div className="daily-details-grid-item">
                     <label> Pressure </label>
                     <label> {item.main.pressure} hPa</label>
                   </div>
 
                   <div className="daily-details-grid-item">
                     <label> Humidity </label>
                     <label> {item.main.humidity}%</label>
                   </div>

                   <div className="daily-details-grid-item">
                     <label> Clouds </label>
                     <label> {item.clouds.all}%</label>
                   </div>

                   <div className="daily-details-grid-item">
                     <label> Wind Speed </label>
                     <label> {item.wind.speed} m/s</label>  
                   </div>

                   <div className="daily-details-grid-item">
                     <label> Sea Level </label>
                     <label> {item.main.sea_level}m</label>  
                   </div>

                   <div className="daily-details-grid-item">
                     <label> Feels Like </label>
                     <label> {Math.round(item.main.feels_like)}°C</label>  
                   </div>

                </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ForeCast;
