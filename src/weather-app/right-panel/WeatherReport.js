import React from 'react'
import Icon from './../icon'

function WeatherReport(props){
	return (
		<div id="weather-report">
			<div>
				<span id="icon-span">
					<Icon icon={props.weatherReportData.icon} otherClasses="fa-2x"/>
				</span>
				<span id="date-span">
					<h1>Today</h1>
					<p>{props.date}</p>
				</span>				
			</div>
			<div>
				<p id="weather-temp">{props.weatherReportData.temp}°C</p>
				<p>{props.weatherReportData.city}, {props.weatherReportData.country}</p>
				<p>Feels Like {props.weatherReportData.feels_like} ● Max Temp {props.weatherReportData.temp_max} ● Min Temp {props.weatherReportData.temp_min}</p>
			</div>
		</div>
	)
}

export default WeatherReport