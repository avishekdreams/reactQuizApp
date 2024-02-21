import React from 'react';

export default function StartScreen({ numQues, dispatch }) {
	return (
		<div className="start">
			<h2>Welcome to the React Quiz!</h2>
			<h3>{numQues} questions to test your mastery</h3>
			<button className="btn btn-ui" onClick={() => dispatch({ type: "start" })}>Let's Start</button>
		</div>
	)
}
