import { useBgm, usePage } from "../../util/hooks"

export const MainPage = () => {
	const [page, setPage] = usePage();
	useBgm("lobby")
	return <main>
		<h1>Survive IB</h1>
		<button className="maxButton" onClick={() => setPage("setup")}>Start</button>
	</main>
}