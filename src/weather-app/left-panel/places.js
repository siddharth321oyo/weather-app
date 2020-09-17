import React from 'react'

function PlaceELement(props){
	return(
		<li onClick={props.changeLocation} id={props.city}>
			<img src={props.image} className="place-image" alt="Could not load" style={{"width":"150px","height":"190px"}}/>
			<p className="place-name">{props.city}, {props.country}</p>
		</li>
	)
}

function PlacesForm(props){
	return (
		<div id="places-form">
			<i className="fas fa-times fa-2x" onClick={props.toggleForm}/>
			<h1>Form to enter a new city</h1>
			<label>City Name <input onChange={props.changeFormvals} type="text" value={props.placeName} name="placeName"/></label>
			<label>Image Url <input onChange={props.changeFormvals} type="text" value={props.url} name="url"/></label>
			<button id="form-button" onClick={props.submitForm}>Submit</button>
		</div>
	)
}

class Places extends React.Component{
	
	constructor(props){
		super(props)
		this.state={
			places: [
				{
					city: "Paris",
					country: "FR",
					image: "https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900"
				},
				{
					city: "Moscow",
					country: "RU",
					image: "https://assets.browserlondon.com/app/uploads/2019/10/st-basils-cathedral-3-768x432.jpg"
				},
				{
					city: "Dehradun",
					country: "IN",
					image: "https://uttarakhandtourism.gov.in/wp-content/uploads/2018/11/dehradun-2.jpg"
				},
			],
			showForm: false,
			placeName: "",
			url: ""
		}
		this.toggleForm=this.toggleForm.bind(this)
		this.submitForm=this.submitForm.bind(this)
		this.changeFormvals=this.changeFormvals.bind(this)
	}

	toggleForm(){
		this.setState(function(prev){
			return{
				showForm: !prev.showForm
			}
		})
	}

	submitForm(){
		fetch("http://api.openweathermap.org/data/2.5/weather?q="+this.state.placeName+"&units=metric&APPID=a1b2e27681e2aa3558ef7c95b9493f32")
		.then(res=>res.json())
		.then((result)=>{
			if(result.cod!==200)
				return
			this.setState(function(prev){
				prev.places.push({
					city: prev.placeName,
					country: result.sys.country,
					image: prev.url
				})
				return{
					places: prev.places,
					showForm: false,
					placeName: "",
					url: ""
				}
			})
		})
	}

	changeFormvals(event){
		let {name, value}=event.target
		this.setState({
			[name]: value
		})
	}

	render(){

		const placesList=this.state.places.map((ele)=>{
			return <PlaceELement key={ele.city} city={ele.city} country={ele.country} image={ele.image} changeLocation={this.props.changeLocation}/>
		})

		return (
			<div>
				<ul id="place-list">
					{placesList}
					<li>
						<button onClick={this.toggleForm}>
							<div><i className="fas fa-plus button-icon" /></div>
							Add City
						</button>
					</li>
				</ul>
				{this.state.showForm && <PlacesForm toggleForm={this.toggleForm} changeFormvals={this.changeFormvals} submitForm={this.submitForm} placeName={this.state.placeName} url={this.state.url}/>}
			</div>
		)
	}

}

export default Places