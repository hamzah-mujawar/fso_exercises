import CountryInfo from './CountryInfo'
import Countries from './Countries'

const Display = ({ filteredCountries, handleShowCountry }) => {
    if (filteredCountries.length === 1){
	return(
	    filteredCountries.map((country) =>
		<CountryInfo key={country.cca2} country={country} />
	    )
	)
    } else if(filteredCountries.length < 10) {
	return(
	    filteredCountries.map((country) => (
		<div key={country.name.common}>
		    <Countries key={country.name.common} countries={country} handleShowCountry={handleShowCountry} />
		</div>
	    ))
	)
    } else{
	return(
	    <p>Too many matches, specify another filter</p>
	)
    }
}

export default Display
