export default function Buttons({ index, showPrev, dispatch, numQues, answer }) {
	if (answer === null) return null;

	return (
		<div className="btn-container">
			{showPrev && <button className="btn btn-ui" onClick={() => dispatch({ type: "showPrev" })}>Back</button>}
			{index < numQues - 1 && (
				<button
					className="btn btn-ui"
					onClick={() => dispatch({ type: "nextQues" })}>
					Next
				</button>
			)}

			{index === numQues - 1 && (
				<button
					className="btn btn-ui"
					onClick={() => dispatch({ type: "finish" })}>
					Finish
				</button>
			)}

		</div>

	)
}
