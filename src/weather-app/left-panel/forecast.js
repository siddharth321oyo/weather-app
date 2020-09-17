import React from 'react'
import Icon from './../icon'

function Details(props){
	const DetailsList=props.data.map(ele=>{
		return <li myattri={ele.time} key={ele.time} onClick={props.highlight} className={props.highlightIdentifier===ele.time?"highlight-detail":""}><p>{ele.time}</p> <Icon icon={ele.icon} /> <p>{ele.temp}</p></li>
	})
	
	return(
		<ul id="detail-list" style={{"left":props.clientX, "top":props.clientY}}>
			{DetailsList}
		</ul>
	)
}

function ForecastElement(props){
	let bar_perc=(100-(((props.data.temp_max-props.data.temp_min)/props.data.temp_max)*100))+"%"
	return( 
		<li id={props.data.date} onClick={props.showDetails}><span className="forecast-date">{props.data.date}</span>
			<span className="forecast-humidity"><i className="forecast-icon fas fa-tint"/>{props.data.humidity}</span>
			<span className="forecast-icons"><Icon otherClasses="forecast-icon" icon={props.data.condition[0].icon} /></span>
			<span className="forecast-temp-min">{props.data.temp_min}</span> <span className="progress-bar"><span className="progress" style={{"width":bar_perc}}></span></span> <span className="forecast-temp-max">{props.data.temp_max}</span>
		{props.detailId===props.data.date && <Details clientX={props.clientX} clientY={props.clientY} highlight={props.highlight} highlightIdentifier={props.highlightIdentifier} data={props.data.condition}/>}
		</li>
	)
}

function Forecast(props){
	let ForecastList=[]
	if(!props.loading && !props.error){
		ForecastList=props.forecastData.map(ele=>{
			return <ForecastElement clientX={props.clientX} clientY={props.clientY} highlight={props.highlight} highlightIdentifier={props.highlightIdentifier} data={ele} key={ele.date} detailId={props.detailId} showDetails={props.showDetails}/>
		})
	}

	return(
		<div>
			<h1>{props.location}</h1>
			{props.loading && <h1>Loading...</h1>}
			{!props.loading && props.error && <h1>Error</h1>}
			{!props.loading && !props.error && <ul id="forecast-list">{ForecastList}</ul>}
		</div>
	)
}

export default Forecast