import { useInterval, useOnClickOutside } from "usehooks-ts";
import { useAlerts, useBgm, useGamePhase, useGameStage, useGameTime, useHomework, useModals, useStats, useTime } from "../../util/hooks";
import styles from "./game.module.scss";
import { useEffect, useRef, useState } from "react";
import { Modal } from "../../components/Modal";
import { homeworkMap } from "./homework";
import { courseMap } from "../../data/courses";
import { AnimatePresence, motion } from "motion/react";
import confetti from "canvas-confetti";
import { Alert } from "../../components/Alert";

export const Home = () => {
	const { modals, setModals,addModal } = useModals();
	const [time, min, sec, setTime] = useTime();
	const [room, setRoom] = useState("bedroom");
	const alert = useAlerts();
	const alertedRef = useRef(false);
	const missed = useRef([] as number[]);
	useBgm("ibcourses");
	useInterval(() => {
		if (document.visibilityState === "hidden") return;
		if (time > (60 * 24)) setTime(0)
		else setTime(x => x + 1);
	}, 1000);

	useEffect(() => {
		if (time === 7 * 60 + 30 && !alertedRef.current) {
			alert.addAlert(id => <Alert title="Warning" details="School starts in 30 minutes! Make sure to leave by 8:00 or you will be late." icon="⚠" id={id} />);
			alertedRef.current = true;
		}
		if (time === (60 * 8)) {
			if (missed.current.includes(1)) return;
			missed.current.push(1);
			alert.addAlert(id => <Alert id={id} title="Block A Missed" details="You are now late to Block A." icon="💀" />)
		}
		if (time === (60 * 9 + 30)) {
			if (missed.current.includes(2)) return;
			missed.current.push(2);
			alert.addAlert(id => <Alert id={id} title="Block B Missed" details="You are now late to Block B." icon="💀" />)
		}
		if (time === (60 * 11 + 30)) {
			if (missed.current.includes(3)) return;
			missed.current.push(3);
			alert.addAlert(id => <Alert id={id} title="Block C Missed" details="You are now late to Block C." icon="💀" />)
		}
		if (time === (60 * 13)) {
			if (missed.current.includes(4)) return;
			missed.current.push(4);
			alert.addAlert(id => <Alert id={id} title="Block D Missed" details="You are now late to Block D." icon="💀" />)
		}
		if (time === (60 * 14 + 30)) {
			if (missed.current.includes(5)) return;
			missed.current.push(5);
			alert.addAlert(id => <Alert id={id} title="School Skipped" details="You have missed every single class today. What are you even doing?" icon="💀" />)
		}
	}, [time, alert])

	return (
		<>
			<div className={styles.time}>
				<img src="/img/time.png" />
				<div className={styles.timeDisplay}>
					{min.toString().padStart(2, "0")}:{sec.toString().padStart(2, "0")}
				</div>
			</div>
			<AnimatePresence>
				{room === "bedroom" ? (
					<motion.div key="bedroom" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
						<img className={styles.background} src="/img/bedroom.png" />
						<img
							src="/img/homework.png"
							className={styles.homeworkButton}
							onClick={() => {
								setModals(x => {
									const id = Math.random();
									return x.concat({ id, element: <HomeworkModal id={id} /> });
								});
							}}
						/>
						<img
							src="/img/arrowLeft.png"
							className={styles.hallwayButton}
							onClick={() => {
								setRoom("hallway");
							}}
						/>
						<img
							src="/img/bed.png"
							className={styles.bedButton}
							onClick={() => {
								setModals(x => {
									const id = Math.random();
									return x.concat({ id, element: <BedModal id={id} /> });
								});
							}}
						/>
					</motion.div>
				) : room === "kitchen" ? (
					<motion.div key="kitchen" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
						<img className={styles.background} src="/img/kitchen.png" />
						<img
							src="/img/arrowLeft.png"
							className={styles.exitKitchenButton}
							onClick={() => {
								setRoom("hallway");
							}}
						/>
					</motion.div>
				) : room === "hallway" ? (
					<motion.div key="hallway" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
						<img className={styles.background} src="/img/hallway.png" />
						<img
							src="/img/arrowUp.png"
							className={styles.roomButton}
							onClick={() => {
								setRoom("bedroom");
							}}
						/>
						<img
							src="/img/arrowUp.png"
							className={styles.fakeRoomButton}
							onClick={() => {
							}}
						/>
						<img src="/img/arrowUp.png" className={styles.exitButton} onClick={() => {
							addModal(id => <ExitModal id={id} />)
						}} />
						<img
							src="/img/arrowRight.png"
							className={styles.kitchenButton}
							onClick={() => {
								setRoom("kitchen");
							}}
						/>
					</motion.div>
				) : (
					<p>where are you</p>
				)}
			</AnimatePresence>
		</>
	);
};

const HomeworkModal = ({ id }: { id: number }) => {
	const [homework, setHomework] = useHomework();
	const [activeHomework, setActiveHomework] = useState<number | null>(null);
	const Active = activeHomework ? homeworkMap[homework.find(x => x.id === activeHomework)!.type] : null;
	const activeRef = useRef<HTMLDivElement | null>(null);
	const [stats, setStats] = useStats();
	useOnClickOutside(activeRef, () => {
		setActiveHomework(null);
	});
	return (
		<Modal id={id} title="Homework">
			{homework
				.filter(x => x.id !== activeHomework)
				.map(x => {
					const Element = homeworkMap[x.type];
					return (
						<div
							className={styles.homeworkWrapper}
							key={x.id}
							onClick={() => {
								if (activeHomework) return;
								if (stats.energy < 4) return alert("Not enough energy.");
								setActiveHomework(x.id);
							}}
						>
							<Element layout layoutId={x.id.toString()} id={x.id} />
							<motion.div className={styles.homeworkTitle} layout layoutId={`title-${x.id}`}>
								{courseMap[x.course].name}
							</motion.div>
						</div>
					);
				})}
			{activeHomework && Active && (
				<div className={styles.activeHomework} ref={activeRef}>
					<Active
						layout
						layoutId={activeHomework.toString()}
						id={activeHomework}
						complete={() => {
							setHomework(y => y.filter(z => z.id !== activeHomework));
							setActiveHomework(null);
							confetti({ origin: { x: 0.5, y: 0.7 } });
							setStats(x => ({ ...x, energy: x.energy - 4 }));
						}}
					/>
				</div>
			)}
		</Modal>
	);
};

const BedModal = ({ id }: { id: number }) => {
	const [homework, setHomework] = useHomework();
	const [activeHomework, setActiveHomework] = useState<number | null>(null);
	const Active = activeHomework ? homeworkMap[homework.find(x => x.id === activeHomework)!.type] : null;
	const activeRef = useRef<HTMLDivElement | null>(null);
	const [stats, setStats] = useStats();
	return <Modal id={id} title="Bed" scaleX={0.4} scaleY={0.5}></Modal>;
};

const ExitModal = ({ id }: { id: number }) => {
	const [gamePhase, setGamePhase] = useGamePhase();
	const [gameStage, setGameStage] = useGameStage();
	const [gameTime, setGameTime] = useGameTime();
	const modals = useModals();
	const [time, min, sec, setTime] = useTime();
	return <Modal id={id} title="Exit" scaleX={0.4} scaleY={0.5}>
		<h1>Go to school?</h1>
		<p>Make sure that you have finished everything at home.</p>
		<button onClick={() => {
			setGameStage("school");
			const block = time > 60 * 13 ? "d" : time > 60 * 11 + 30 ? "c" : time > 9 * 60 + 30 ? "b" : "a";
			setGamePhase("start");
			setGameTime(x => ({ ...x, block: block.toUpperCase() }));
			modals.removeModal(id);
		}}>Go to School</button>
	</Modal>;
};
