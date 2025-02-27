import styles from "./game.module.scss";
import { AlertContext, ModalContext, useBgm, useGameData, useGameStage, useGameTime, usePage, useStats, useTime } from "../../util/hooks";
import { CSSProperties, Fragment, ReactNode, useEffect, useMemo, useState } from "react";
import { Home } from "./home";
import { useInterval } from "usehooks-ts";
import { AnimatePresence, motion } from "motion/react";
import { StatBar } from "../../components/StatBar";
import { Alert } from "../../components/Alert";
import { Modal } from "../../components/Modal";
import { courseMap } from "../../data/courses";
import { School } from "./school";

export const GamePage = () => {
	const [page, setPage] = usePage();
	const [gameStage, setGameStage] = useGameStage();
	const [modals, setModals] = useState<{ id: number; element: ReactNode }[]>([]);
	const [alerts, setAlerts] = useState<{ id: number; element: ReactNode }[]>([]);
	const modalContext = useMemo(() => ({ modals, setModals }), [modals, setModals]);
	const alertContext = useMemo(() => ({ alerts, setAlerts }), [alerts, setAlerts]);
	const [gameTime, setGameTime] = useGameTime();
	const [stats, setStats] = useStats();
	return (
		<main className={styles.main}>
			<AlertContext.Provider value={alertContext}>
				<ModalContext.Provider value={modalContext}>
					<div className={styles.gameBox}>
						{gameStage === "home" ? <Home /> : gameStage === "school" ? <School /> : null}
						<div className={styles.statBars}>
							<StatBar name="Energy" icon="/img/stat/energy.png" value={stats.energy} border="#444" color="#e0e083" />
							<StatBar name="Mental Health" icon="/img/stat/mentalHealth.png" value={stats.mentalHealth} border="#ff6ef1" color="#a97d97" />
						</div>
						<div className={styles.gameTime}>
							{gameTime.month[0].toUpperCase() + gameTime.month.slice(1)} {gameTime.date} (Day {gameTime.day}){gameTime.block !== "-" ? ` - Block ${gameTime.block}` : ""}
						</div>
						<div className={styles.extraButtons}>
							<button
								onClick={() => {
									const id = Math.random();
									modalContext.setModals(x => x.concat({ id, element: <TimetableModal id={id} /> }));
								}}
							>
								Timetable
							</button>
						</div>
						<div className={styles.modalContainer} {...(modals.length ? { "data-active": true } : null)}>
							<AnimatePresence>
								{modals.map(x => (
									<motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={x.id}>
										{x.element}
									</motion.div>
								))}
							</AnimatePresence>
						</div>
						<div className={styles.alertContainer}>
							<AnimatePresence>
								{alerts.map(x => (
									<motion.div
										exit={{ marginRight: "-25em" }}
										initial={{ marginRight: "-25em" }}
										animate={{ marginRight: "0" }}
										key={x.id}
										className={styles.alert}
									>
										{x.element}
									</motion.div>
								))}
							</AnimatePresence>
						</div>
					</div>
				</ModalContext.Provider>
			</AlertContext.Provider>
		</main>
	);
};
const blocks = ["A", "B", "C", "D"];
const TimetableModal = ({ id }: { id: number }) => {
	const gameData = useGameData();
	const [gameTime, setGameTime] = useGameTime();
	return (
		<Modal id={id} title="Timetable">
			<table className={styles.timetable}>
				<tbody>
					<tr>
						<th />
						<th style={{backgroundColor: gameTime.day === 1 ? "#e9e9a7" : ""}}>Day 1</th>
						<th style={{backgroundColor: gameTime.day === 2 ? "#e9e9a7" : ""}}>Day 2</th>
					</tr>
					{blocks.map((x, i) => (
						<tr key={x}>
							<th style={{backgroundColor: gameTime.block === x ? "#e9e9a7" : ""}}>Block {x}</th>
							<td style={{backgroundColor: gameTime.block === x && gameTime.day === 1 ? "#f4f47c" : ""}}>{courseMap[gameData.schedule[0][i]]?.name}</td>
							<td style={{backgroundColor: gameTime.block === x && gameTime.day === 2 ? "#f4f47c" : ""}}>{courseMap[gameData.schedule[1][i]]?.name}</td>
						</tr>
					))}
				</tbody>
			</table>
		</Modal>
	);
};
