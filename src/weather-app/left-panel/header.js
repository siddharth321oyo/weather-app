import React from 'react'

function Header(props){
	return(
		<div>
			<input name="query" type="text" placeholder="Search new places" value={props.query} onChange={props.handleChange} onKeyPress={props.search}/>
			<i className="fas fa-search search-icon" />
			<select>
				<option disabled selected hidden>All places</option>
			</select>
			<h1 id="title"> <span>Weather</span> Forecast</h1>
		</div>
	)
}

export default Header