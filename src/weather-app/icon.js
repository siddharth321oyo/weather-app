import React from 'react'

function Icon(props){

	let iconMapper={
		"01": "sun",
		"02": "cloud-sun",
		"03": "cloud",
		"04": "cloud",
		"09": "cloud-rain",
		"10": "cloud-showers-heavy",
		"11": "bolt",
		"13": "snowflake",
		"50": "smog"
	}
	let classVal="fas fa-"+iconMapper[props.icon]
	if(props.otherClasses!==undefined)
		classVal+=" "+props.otherClasses
	return <i className={classVal} />

}

export default Icon