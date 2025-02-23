import { useInterval, useOnClickOutside } from "usehooks-ts";
import { useHomework, useModals, useStats, useTime } from "../../util/hooks";
import styles from "./game.module.scss";
import { useRef, useState } from "react";
import { Modal } from "../../components/Modal";
import { homeworkMap } from "./homework";
import { courseMap } from "../../data/courses";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
export const Home = () => {
	const { modals, setModals } = useModals();
	const [time, min, sec, setTime] = useTime();
	const [room, setRoom] = useState("bedroom");
	useInterval(() => {
		setTime(x => x + 1);
	}, 1000);

	return (
		<>
			<div className={styles.time}>
				<img src="/img/time.png" />
				<div className={styles.timeDisplay}>
					{min.toString().padStart(2, "0")}:{sec.toString().padStart(2, "0")}
				</div>
			</div>
			{room === "bedroom" ? (
				<>
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
				</>
			) : room === "kitchen" ? (
				<></>
			) : (
				<p>where are you</p>
			)}
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
						<div className={styles.homeworkWrapper} key={x.id} onClick={() => {
							if (activeHomework) return;
							if (stats.energy < 4) return alert("Not enough energy.")
							setActiveHomework(x.id);

							
						}}>
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
