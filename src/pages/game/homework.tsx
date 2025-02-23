import { ReactNode, RefObject, useState } from "react";
import styles from "./game.module.scss";
import { motion } from "motion/react";

const seeded = (seed: number) => {
	const value = 10000 * Math.sin(10000 * seed);
	return value - Math.floor(value);
};

const conj = ["and", "the", "but", "was", "is", "yet", "for", "at"];
const nouns = ["Dev", "real", "tree", "fish", "crab", "sky", "happy", "knowledge", "knower"];

const randomText = (seed: number) => {
	let s = seed;
	const strs = [];
	for (let i = 0; i < 260; i++) {
		s = seeded(s);
		if (i % 2 === 0) strs.push(nouns[Math.floor(s * nouns.length)]);
		else strs.push(conj[Math.floor(s * conj.length)]);
	}
	const joined = strs.join(" ");
	return joined[0].toUpperCase() + joined.slice(1) + ".";
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _homeworkMap: Record<string, (props: { id: number; complete: () => void; ref: RefObject<any> }) => ReactNode> = {
	add({ complete, ref, id }) {
		const [inputs, setInputs] = useState(["", "", "", "", ""]);
		const [random] = useState(() => [...Array(5)].map((_, i) => [Math.floor(seeded(id + i) * 10) + 1, Math.floor(seeded(id - i) * 10) + 1]));
		const [incorrect, setIncorrect] = useState([] as number[]);
		const submit = () => {
			const newIncorrect: number[] = [];
			for (const [i, q] of random.entries()) {
				if (+inputs[i] !== q[0] + q[1]) newIncorrect.push(i);
			}
			if (newIncorrect.length) setIncorrect(newIncorrect);
			else complete();
		};
		return (
			<div ref={ref} className={`${styles.homework} ${styles.paperHomework}`}>
				{inputs.map((x, i) => (
					<div key={i} style={incorrect.includes(i) ? { color: "red" } : undefined}>
						<h1>
							What is {random[i][0]} + {random[i][1]} ?
						</h1>
						<input
							value={inputs[i]}
							onChange={e => {
								setInputs(x => x.map((y, j) => (j === i ? e.target.value : y)));
								setIncorrect(x => x.filter(n => n !== i));
							}}
						/>
					</div>
				))}
				<button className={styles.homeworkSubmit} onClick={submit}>
					Complete Homework
				</button>
			</div>
		);
	},
	readBook({ complete, ref, id }) {
		const [page, setPage] = useState(-1);
		return (
			<div ref={ref} className={`${styles.homework} ${styles.bookHomework}`}>
				{[...Array(page + 1)]
					.map((_, i) => i)
					.reverse()
					.concat([...Array(Math.max(10 - page - 1, 0))].map((_, i) => i + page + 1))
					.map(x => (
						<motion.div
							key={x}
							className={`${x === 0 ? styles.cover : ""} ${styles.page}`}
							animate={{ transform: page < x ? "rotateY(0deg)" : "rotateY(180deg)" }}
							onClick={() => {
								setPage(p => p + (page < x ? 1 : -1));
								if (page === 8) complete();
							}}
						><div className={styles.pageFront}>{x === 0 ? "" : randomText(x + id)}</div>
						<div className={styles.pageBack}>{x === 0 ? "" : randomText(x + id - 0.5)}</div></motion.div>
					))
					.reverse()}
			</div>
		);
	},
};

export const homeworkMap = Object.fromEntries(Object.entries(_homeworkMap).map(x => [x[0], motion.create(x[1])]));
