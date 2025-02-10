const Filter = ( { newFilter, handleFormChangeFilter } ) => (
     	    <div>
		     filter show with <input
					  value={newFilter}
					  onChange={handleFormChangeFilter}
		     />
	    </div>
)

export default Filter
