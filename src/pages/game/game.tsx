import styles from "./game.module.scss";
import { ModalContext, useBgm, useGameStage, usePage, useStats, useTime } from "../../util/hooks";
import { Fragment, ReactNode, useEffect, useMemo, useState } from "react";
import { Home } from "./home";
import { useInterval } from "usehooks-ts";
import { AnimatePresence, motion } from "motion/react";
import { StatBar } from "../../components/StatBar";

export const GamePage = () => {
	const [page, setPage] = usePage();
	const [gameStage, setGameStage] = useGameStage();
	const [modals, setModals] = useState<{ id: number; element: ReactNode }[]>([]);
	const modalContext = useMemo(() => ({ modals, setModals }), [modals, setModals]);
	const [stats, setStats] = useStats();
	useBgm("ibcourses");
	return (
		<main className={styles.main}>
			<ModalContext.Provider value={modalContext}>
				<div className={styles.gameBox}>
					{gameStage === "home" ? <Home /> : null}
					<div className={styles.statBars}>
					<StatBar name="Energy" icon="/img/stat/energy.png" value={stats.energy} border="#444" color="#e0e083" />
					<StatBar name="Mental Health" icon="/img/stat/mentalHealth.png" value={stats.mentalHealth} border="#ff6ef1" color="#a97d97" />
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
				</div>
			</ModalContext.Provider>
		</main>
	);
};
