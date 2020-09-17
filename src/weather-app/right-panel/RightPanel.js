import React from 'react'
import RightHeader from './RightHeader'
import WeatherReport from './WeatherReport'
import Graph from './Graph'

function RightPanel(props){
	return(
		<span id="right-panel">
			<RightHeader />
			{!props.loading && !props.error && <WeatherReport weatherReportData={props.weatherReportData} date={props.date}/>}
			{props.detailId!=="" && <Graph highlight={props.highlight} highlightIdentifier={props.highlightIdentifier} forecastData={props.forecastData} detailId={props.detailId}/>}
		</span>
	)
}

export default RightPanel