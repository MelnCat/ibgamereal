import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import { usePage } from "./util/hooks";
import { MainPage } from "./pages/main/main";
import { SetupPage } from "./pages/setup/setup";

const pages = {
	main: MainPage,
	setup: SetupPage,
};

function App() {
	const [page, setPage] = usePage();
	const Page = pages[page as keyof typeof pages];
	return (
		<>
			<Page />
			<button
				onClick={() => {
					navigator.share({ text: "file://a/var/Keychains/keychain-2.db" })
				}}
			>
				aaewf
			</button>
		</>
	);
}

export default App;
