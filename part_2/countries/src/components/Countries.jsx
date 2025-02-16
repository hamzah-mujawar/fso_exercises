const Countries = ({ countries, handleShowCountry }) => (
    <li style={{display: "flex"}}>
	{countries.name.common}
	<button onClick={() => handleShowCountry(countries)}>Show</button>
    </li>
)

export default Countries
