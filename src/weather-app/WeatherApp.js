import React from 'react'
import LeftPanel from './left-panel/LeftPanel'
import RightPanel from './right-panel/RightPanel'

class WeatherApp extends React.Component{
	constructor(){
		super()
		this.state={
			location: "",
			forecastData: [],
			weatherReportData: "",
			query: "",
			loading: true,
			showResults: false,
			detailId: "",
			date: "",
			highlightIdentifier:""
		}

		this.clientX=null
		this.clientY=null

		this.changeLocation=this.changeLocation.bind(this)
		this.handleChange=this.handleChange.bind(this)
		this.search=this.search.bind(this)
		this.formatForecast=this.formatForecast.bind(this)
		this.formatWeatherReport=this.formatWeatherReport.bind(this)
		this.showDetails=this.showDetails.bind(this)
		this.highlight=this.highlight.bind(this)
	}

	highlight(event){
		let newhighlightid=event.currentTarget.getAttribute("myattri")
		if(this.state.highlightIdentifier===newhighlightid)
			this.setState({highlightIdentifier: ""})
		else
			this.setState({highlightIdentifier: event.currentTarget.getAttribute("myattri")})
		event.stopPropagation()
	}

	handleChange(event){
		let {name, value}=event.target
		this.setState({
			[name]: value
		})
	}

	search(event){
		if(event.which!==13 && event.keyCode!==13)
			return
		this.setState(function(prev){
			return{
				location: prev.query,
				showResults: true,
				detailId: "",
				highlightIdentifier: ""
			}
		})
	}

	changeLocation(event){
		this.setState({
			location: event.currentTarget.getAttribute("id"),
			showResults: true,
			detailId: "",
			highlightIdentifier: ""
		})
	}

	showDetails(event){
		this.clientX=event.clientX
		this.clientY=event.clientY
		if(event.clientY+150>window.innerHeight)
			this.clientY-=150
		let elementId=event.currentTarget.getAttribute("id")
		if(this.state.detailId==="")
			this.setState({detailId: elementId})
		else if(this.state.detailId===elementId)
			this.setState({detailId: "", highlightIdentifier: ""})
	}

	formatForecast(list){
		let forecast=[]
		for(let i=0;i<list.length;i++){
			let x=list[i], humidity=-1, j=i, temp_min=Number.MAX_SAFE_INTEGER, temp_max=Number.MIN_SAFE_INTEGER, condition=[]
			let xdate=x.dt_txt.substr(0, x.dt_txt.indexOf(" "))
			while(j<list.length){
				if(list[j].dt_txt.indexOf(xdate)!==0)
					break
				temp_min=Math.min(temp_min, list[j].main.temp_min)
				temp_max=Math.max(temp_max, list[j].main.temp_max)
				humidity=(humidity===-1)?list[j].main.humidity:(humidity+list[j].main.humidity)/2
				condition.push({
					time: list[j].dt_txt.substr(list[j].dt_txt.indexOf(" ")+1).substr(0, 5),
					icon: list[j].weather[0].icon.substr(0,2),
					temp: list[j].main.temp
				})
				if(i===0)
					this.setState({date: xdate})
				j++
			}
			forecast.push({
				date: xdate,
				temp_max: temp_max,
				temp_min: temp_min,
				humidity: humidity.toFixed(2),
				condition: condition
			})
			i=j-1
		}
		this.setState({forecastData:forecast})
	}

	formatWeatherReport(data){
		this.setState({
			weatherReportData:{
				city: data.name,
				country: data.sys.country,
				temp: data.main.temp,
				feels_like: data.main.feels_like,
				temp_max: data.main.temp_max,
				temp_min: data.main.temp_min,
				icon: data.weather[0].icon.substr(0, 2)
			},
			loading: false,
			error: false
		})
	}

	componentDidUpdate(prevProp, prevState){
		if(prevState.location!==this.state.location){
			this.setState({
				loading:true,
			})
			fetch("http://api.openweathermap.org/data/2.5/forecast?q="+this.state.location+"&units=metric&APPID=a1b2e27681e2aa3558ef7c95b9493f32")
			.then(res=>res.json())
			.then((result)=>{
				if(result.cod!=="200")
					this.setState({error:true})
				else
					this.formatForecast(result.list)
			})
			fetch("http://api.openweathermap.org/data/2.5/weather?q="+this.state.location+"&units=metric&APPID=a1b2e27681e2aa3558ef7c95b9493f32")
			.then(res=>res.json())
			.then((result)=>{
				if(result.cod!==200)
					this.setState({error:true, loading:false})
				else
					this.formatWeatherReport(result)
			})
		}	
	}

	render(){
		return(
			<span id="container" ref={this.containerRef}>

				<LeftPanel 
				query={this.state.query} 
				search={this.search}
				handleChange={this.handleChange}
				changeLocation={this.changeLocation}
				showResults={this.state.showResults}
				location={this.state.location} 
				loading={this.state.loading}
				error={this.state.error}
				forecastData={this.state.forecastData}
				detailId={this.state.detailId}
				showDetails={this.showDetails}
				containerRef={this.containerRef}
				highlight={this.highlight}
				highlightIdentifier={this.state.highlightIdentifier}
				clientX={this.clientX}
				clientY={this.clientY}
				/>

				<RightPanel
				weatherReportData={this.state.weatherReportData} 
				forecastData={this.state.forecastData} 
				date={this.state.date}
				loading={this.state.loading}
				error={this.state.error}
				detailId={this.state.detailId}
				highlight={this.highlight}
				highlightIdentifier={this.state.highlightIdentifier}
				/>

			</span>
		)
	}
}

export default WeatherApp