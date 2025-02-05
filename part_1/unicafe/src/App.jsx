import { useState } from 'react'

const Button = ({onClick, text}) => (
    <button onClick={onClick}>
	{text}
    </button>
)

const StatisticLine = ({text, value}) => (
    <tr>
	<td>{text}</td>
	<td>{value}</td>
    </tr>
)

const Statistics = ({good, neutral, bad}) => {
    if(good === 0 && neutral === 0 && bad === 0){
	return(
	    <div>
		No feedback given.
	    </div>
	)
    }
    return(
	<div>
	    <table>
		<tbody>
		    <StatisticLine text="good" value={good} />
		    <StatisticLine text="neutral" value={neutral} />
		    <StatisticLine text="bad" value={bad} />
		    <StatisticLine text="all" value={good + bad + neutral} />
		    <StatisticLine text="average" value={(good - bad) / (good + bad + neutral) } />
		    <StatisticLine text="percentage" value={(good)/(good + bad + neutral) + '%'} />
		</tbody>
	    </table>
	</div>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return(
	<div>
	    <h1>Give Feedback</h1>
	    <Button onClick={ () => setGood(good + 1) } text="Good" />
	    <Button onClick={ () => setNeutral(neutral + 1) } text="Neutral" />
	    <Button onClick={ () => setBad(bad + 1) } text="Bad" />
		
	    <h1>Statistics</h1>
	    <Statistics good={good} bad={bad} neutral={neutral} />
	</div>
    )
}

export default App
