const PersonForm = ( { newName, handleFormChangeName, newNumber, handleFormChangeNumber, addPerson }) => (
    <form>
	<h2>add a new</h2>
	<div>
		 name: <input
			   value={newName}
			   onChange={handleFormChangeName}
		 />
	</div>
	<div>
		 number: <input
			     value={newNumber}
			     onChange={handleFormChangeNumber}/>
	</div>
	<div>
	    <button type="submit" onClick={addPerson}>add</button>
	</div>
    </form>
)
export default PersonForm
