import { usePage } from "../../util/hooks"

export const MainPage = () => {
	const [page, setPage] = usePage();
	return <main>
		<h1>Survive IB</h1>
		<button onClick={() => setPage("setup")}>Start</button>
	</main>
}