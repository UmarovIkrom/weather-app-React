import React, {useState} from 'react';
import './App.css'

const api = {
    key: "2982a53b5bf03b5b210eb4f36d3ecf0e",
    base: "https://api.openweathermap.org/data/2.5/"
} 

function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);

    const search = evt => {
        if(evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => handleResult(result))
        }
    }

    const handleResult = response => {
        if(response.cod === "404") {
            setErrorMessage(response.message);
            weather && setWeather({});
        } else {
            setWeather(response);
            setQuery('')
            errorMessage && setErrorMessage("");
        }
    }


    const dateBuilder = () => {
        const d = new Date();
       
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",]
   
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }


    return (
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
            <main>

                <div className="search-box">
                    <input 
                        type="text" 
                        className='search-bar'
                        placeholder='Search Location...'
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                   />
                </div>


                {weather?.main (
                    <div>
                        <div className="location-box">
                            <div className='location'>{weather.name}, {weather.sys.country}</div>
                            <div className='date'>{dateBuilder()}</div>
                        </div>
                        <div className='weather-box'>
                            <div className='temp'>
                                {Math.round(weather.main.temp)}°c
                            </div>
                            <div className='weather'>{weather.weather[0].description}</div>
                        </div>
                    </div>
                )}

                {errorMessage && (
                    <div style={{color: "red", fontSize: "22px", textAlign: "center"}}> {errorMessage}</div>
                )}
                
            </main>
            
        </div>
    );
}

export default App;
