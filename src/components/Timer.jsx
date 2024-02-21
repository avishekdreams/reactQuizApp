import { useEffect } from "react";

export default function Timer({ dispatch, remainingSecs }) {
	const mins = Math.floor(remainingSecs/60);
	const secs = remainingSecs % 60;
	useEffect(() => {
		const id = setInterval(() => {
			dispatch({ type: "ticktick" })
		}, 1000);
		return () => clearInterval(id);
	}, [dispatch]);
	return (
		<div className="timer">{mins < 10 && '0'}{mins}:{secs < 10 && '0'}{secs}</div>
	)
}
