const Fail = ({ message }) => {
    if (!message) {
	return null
    }

    return (
	<div className='fail'>
	    {message}
	</div>
    )
}

export default Fail
