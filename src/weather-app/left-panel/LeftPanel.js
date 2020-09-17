import React from 'react'
import Header from './header'
import Places from './places'
import Forecast from './forecast'

function LeftPanel(props){
	return(
		<span id="left-panel">
			<Header query={props.query} search={props.search} handleChange={props.handleChange}/>
			<Places changeLocation={props.changeLocation}/>
			{props.showResults && <Forecast 
				highlight={props.highlight}
				highlightIdentifier={props.highlightIdentifier}
				loading={props.loading} 
				location={props.location}
				error={props.error}
				forecastData={props.forecastData}
				detailId={props.detailId}
				showDetails={props.showDetails}
				clientY={props.clientY}
				clientX={props.clientX}
			/>}
		</span>
	)
}

export default LeftPanel