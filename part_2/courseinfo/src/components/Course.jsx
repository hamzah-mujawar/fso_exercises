const Header = ( { courses } ) => (
    <h1>{ courses.name }</h1>
)

const Parts = ( props ) => (
    <p>{ props.part.name } { props.part.exercises }</p>
)

const Content = ( { courses } ) => (
    <div>
	{ courses.parts.map( ( part ) => (
	    <Parts key={ part.id } part={ part } />))
	}
    </div>
)

const Total = ( { courses } ) => (
    <b>
	{ 'total of ' }
	{ courses.parts.reduce( ( sum, part) => (
	    sum += part.exercises 
	), 0)}
	{ ' exercises' }
    </b>
)

const Course = ( { courses } ) => {
    return(
	<div>
	    <Header courses={ courses } />
	    <Content courses={ courses } />
	    <Total courses={ courses } />
	</div>
    )
}

export default Course
