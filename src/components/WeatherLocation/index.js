import React, {Component} from 'react';
import Location from './Location';
import WeatherData from './WeatherData';
import {SUN} from '../../constants/weathers';
import './styles.css';

const location = "Mexico City,MX"
const api_key = "64717d119744c560b3b8e62c09078f43";
const api_weather = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${api_key}`;

const data1 = {
    temperature: 20,
    weatherState: SUN,
    humidity: 10,
    wind: '10m/s'
};

class WeatherLocation extends Component { 

    constructor(){
        super();
        this.state = {
            data: data1,
            city: "Mexico"
        }
    }

    getWeatherState = (weather) =>{
        return SUN;
    }

    getData = (weather_data) => {
        const {humidity,temp} = weather_data.main;
        const {speed} = weather_data.wind;
        const weatherState = this.getWeatherState(this.weather);

        const data = {
            humidity,
            temperature: temp,
            weatherState,
            wind: `${speed} m/s`
        }

        return data;
    }

    handleUpdateClick = () => {
        fetch(api_weather).then(data => {
            
            console.log(data)
            return data.json();
        }).then(weather_data => {
            debugger;
            const data = this.getData(weather_data);
            this.setState({data});
            
        });

        console.log("actualizado");
    }

    render = () => {
        const {data, city} = this.state;
        return(
            <div className='weatherLocationCont'>
                <Location city={city}/>
                <WeatherData data={data} />
                <button onClick={this.handleUpdateClick}>Actualizar</button>
            </div>
        );
    }
}

export default WeatherLocation;