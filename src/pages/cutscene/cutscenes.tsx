import { useBgm, usePage } from "../../util/hooks";
import styles from "./cutscenes.module.scss";
export const IntroCutscene = () => {
	const [page, setPage] = usePage();
	useBgm("")
	return (
		<main className={styles.main}>
			<h1>First, a message from our coordinator:</h1>
			<video controls>
				<track default kind="captions" srcLang="en" src="/video/intro.vtt" />
				<source src="./video/intro.mp4" type="video/mp4" />
			</video>
			<button className="maxButton" onClick={() => setPage("game")}>Continue</button>
		</main>
	);
};
