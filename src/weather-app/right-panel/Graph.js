import React from 'react'

function Graph(props){
	let graphVals=[]
	for(let i=0;i<props.forecastData.length;i++){
		if(props.detailId===props.forecastData[i].date){
			graphVals=props.forecastData[i].condition
			break
		}
	}

	let heightMapper={
		"01": "35px",
		"02": "70px",
		"03": "105px",
		"04": "140px",
		"09": "175px",
		"10": "210px",
		"11": "245px",
		"13": "35px",
		"50": "35px"
	}

	let graphElements=graphVals.map((ele, idx)=>{
		let classVal="bar "+((ele.time===props.highlightIdentifier)?"highlighted-bar":"normal-bar")
		return (
			<div key={idx} className="graph-element">
				<div>{ele.time}</div>
				<div myattri={ele.time} className={classVal} onClick={props.highlight} style={{"height":heightMapper[ele.icon]}}></div>
			</div>
		)
	})

	return(
		<div id="graph">
			<p id="graph-heading">Chances of Rain</p>
			<div id="graph-box">
				{graphElements}
			</div>
		</div>
	)
}

export default Graph