const CountryInfo = ({ country }) => (
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
    </div>
)

export default CountryInfo
