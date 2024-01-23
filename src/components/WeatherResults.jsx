import { useEffect } from "react";
import "./WeatherResults.css"

const WeatherResults = ({allTemperatures, location}) => {

    function getWeekDays (index) {
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return weekdays[index];
    }
    
    function divideTemperaturesToDays() {
        const week = [];
        for(let i = 0; i < allTemperatures.length; i++) {
            const day = [];
            for(let j = i; j < i + 24; j++) {
                day.push(allTemperatures[j]);
            }
            i += 24;
            week.push(day);
        }
        return week;
    }
    
    const temperaturesPerDay = divideTemperaturesToDays();
    let dayIndex = new Date().getDay()-1;
    return (
        <section id="weather-results">
            <h1>Temperatures of the week in {location}</h1>
            <div id="day-grid">
            
                {temperaturesPerDay.map((day, i) => {
                    {dayIndex >= 6 ? dayIndex = 0 : dayIndex++}
                    return <div className="day" key={i}>
                        <p>{getWeekDays(dayIndex)}</p>
                        <ol>
                        {day.map((temperature, hour) => {
                                return <li key={hour}>
                                    {temperature !== undefined &&
                                    <>
                                        <p><b>{`${hour < 10 ? "0" : ""}${hour} `}</b></p>
                                        <p>{`${temperature}°C,`}&nbsp;</p>
                                    </>}
                                </li>
                            })}
                        </ol>
                    </div>
                })}   
            </div>
        </section>
    );
}
 
export default WeatherResults;