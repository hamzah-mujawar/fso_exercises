const CountryInfo = ({ country, weatherCountry }) => {
    const iconUrl = 'https://openweathermap.org/img/wn/'
    return(
	<div>
	    <h1>{country.name.common} </h1>
	    <p>capital {country.capital}</p>
	    <p>area {country.area}</p>
	    <h3>languages</h3>
	    <ul>
		{Object.values(country.languages).map((language, index) => (
		    <li key={index}>{language}</li>
		))}
	    </ul>
	    <img width="200" src={country.flags.png} />
	    <h3>Weather in {country.capital}</h3>
	    {!weatherCountry?.main ? (
                <p>You have inputted this country before, try another country</p>
            ) : (
                <>
                    <p>Temperature {(weatherCountry.main.temp - 273.15).toFixed(2)} °C</p>
                    <img src={`${iconUrl}${weatherCountry.weather[0].icon}@2x.png`} alt="weather icon" />
                </>
            )}
	    {!weatherCountry?.wind
		? <p>Could not get wind speed</p>
		: <p>Wind {weatherCountry.wind.speed} m/s</p>
	    }
	</div>
    )
}

export default CountryInfo
