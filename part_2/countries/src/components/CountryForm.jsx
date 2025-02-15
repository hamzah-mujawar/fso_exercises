const CountryForm = ({ countrySearch, handleFormChangeCountry}) => (
    <form>
	<div>
		 find countries <input
				    value={countrySearch}
				    onChange={handleFormChangeCountry}
		 />
	</div>
    </form>
)

export default CountryForm
