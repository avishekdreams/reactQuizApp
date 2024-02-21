export default function ProgressBar({ index, numQues, points, maxPossPoints, answer }) {
	return (
		<header className="progress">
			<progress max={numQues} value={index + Number(answer !== null)} />
			<p>Question <strong>{index + 1}</strong> / {numQues}</p>
			<p><strong>{points}</strong> / {maxPossPoints}</p>
		</header>
	)
}
