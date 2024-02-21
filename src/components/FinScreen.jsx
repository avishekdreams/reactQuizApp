export default function FinScreen({ points, maxPossPoints, highscore, dispatch }) {
	const percentage = (points / maxPossPoints * 100);
	let emoji;
	if (percentage === 100) emoji = '🤗';
	if (percentage >= 80 && percentage < 100) emoji = '😊';
	if (percentage >= 60 && percentage < 80) emoji = '🙂';
	if (percentage >= 30 && percentage < 60) emoji = '🙄';
	if (percentage >= 10 && percentage < 30) emoji = '😯';
	if (percentage === 0) emoji = '😱';

	return (
		<>
			<p className="result">
				<span>{emoji}</span>You scored <strong>{points}</strong> out of {maxPossPoints} ({Math.ceil(percentage)}%)
			</p>

			<p className="highscore">(Highscore: {highscore} points)</p>

			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: "restart" })}>
				Restart Quiz
			</button>
		</>
	)
}
