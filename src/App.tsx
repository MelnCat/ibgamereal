import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styles from "./App.module.scss";
import { useBgm, usePage } from "./util/hooks";
import { MainPage } from "./pages/main/main";
import { SetupPage } from "./pages/setup/setup";
import { IntroCutscene } from "./pages/cutscene/cutscenes";
import { GamePage } from "./pages/game/game";
import { Canvas } from "glsl-canvas-js";
import shader from "./assets/glsl/background.frag";

const pages = {
	main: MainPage,
	setup: SetupPage,
	intro: IntroCutscene,
	game: GamePage,
};

function App() {
	const [page, setPage] = usePage();
	const [clicked, setClicked] = useState(false);
	const [bgm, setBgm] = useBgm();
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const sound = useMemo(() => {
		const audio = new Audio();
		audio.loop = true;
		audio.addEventListener("canplaythrough", () => {
			audio.play();
		});
		return audio;
	}, []);
	const Page = pages[page as keyof typeof pages];
	const onClick = () => {
		setClicked(true);
	};
	useEffect(() => {
		const newSrc = `/audio/${bgm}.mp3`;
		if (newSrc !== sound.src) {
			sound.pause();
			sound.volume = 0.5;
			sound.currentTime = 0;
			sound.src = newSrc;
		}
	}, [clicked, bgm, sound]);
	useEffect(() => {
		/*new Canvas(canvasRef.current!, {
			fragmentString: shader
		});*/
	}, []);
	return (
		<>
			<canvas className={styles.background} ref={canvasRef} />
			{clicked || (
				<div className={styles.clickCheck} onClick={onClick}>
					Click to begin
				</div>
			)}
			<Page />
		</>
	);
}

export default App;
