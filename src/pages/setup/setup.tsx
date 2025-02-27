import { useState } from "react";
import styles from "./setup.module.scss";
import { courseMap, courses } from "../../data/courses";
import { useBgm, useOptionalGameData, usePage } from "../../util/hooks";

const GroupRow = ({ name, onSelect, extra, id, checked }: { id: string; name: string; onSelect: (id: string) => void; extra?: string; checked: string[] }) => {
	return (
		<div className={`${styles.groupRow}${checked.includes(id) ? ` ${styles.groupRowChecked}` : ""}`}>
			<div className={styles.groupLeft}>
				<span>{name}</span>
				{extra && <div className={styles.extra}>*{extra}</div>}
			</div>
			<div
				className={`${styles.groupCheckbox}${id === "na" ? ` ${styles.illegalClass}` : ""}`}
				onClick={() => {
					if (id !== "na") onSelect(id);
				}}
			>
				{checked.includes(id) && <div className={styles.checkbox}>X</div>}
			</div>
		</div>
	);
};

export const SetupPage = () => {
	const [checked, setChecked] = useState([] as string[]);
	const [game, setGame] = useOptionalGameData();
	const [page, setPage] = usePage();
	useBgm("lobby");
	const onSelect = (id: string) => {
		const course = courseMap[id];
		if (checked.includes(id)) {
			setChecked(checked.filter(x => x !== id));
			return;
		}
		if (course.group <= 2 || course.group === 5) {
			setChecked(checked.filter(x => courseMap[x].group !== course.group).concat(id));
			return;
		}
		const group3 = checked.filter(x => courseMap[x].group === 3);
		const group4 = checked.filter(x => courseMap[x].group === 4);
		const others = group3.concat(group4);
		if ((group3.length === 2 && course.group === 3) || (group4.length === 2 && course.group === 4)) {
			setChecked(
				checked
					.filter(x => courseMap[x].group !== course.group)
					.concat((course.group === 3 ? group3 : group4)[1])
					.concat(id)
			);
			return;
		}
		setChecked(
			checked
				.filter(x => !others.includes(x))
				.concat(others.reverse().slice(0, 2))
				.concat(id)
		);
	};
	const onSubmit = () => {
		if (checked.length < 6) return alert("imagine being in partial");
		if (checked.filter(x => courseMap[x].id.includes("hl")).length < 3) return alert("not enough HLs");
		const schedule = checked.concat("spare").concat("tok");
		while (schedule[0] === "spare" || schedule[4] === "spare") schedule.sort(() => Math.random() - 0.5)
		setGame({
			courses: checked,
			schedule: [schedule.slice(0, 4) as [string, string, string, string], schedule.slice(4, 8) as [string, string, string, string]],
			grades: Object.fromEntries(checked.map(x => [x, 100]))
		});
		setPage("intro");
	};
	return (
		<main>
			<div className={styles.paper}>
				<div className={styles.funkyBar}></div>
				<h1 className={styles.pageTitle}>Full IB Diploma Programme Course Selection</h1>
				<article className={styles.form}>
					<section>
						<div className={styles.group}>
							<div className={styles.title}>Group 1: Studies in Language and Literature</div>
							<GroupRow id="enghl" checked={checked} name="English A: Literature HL" onSelect={onSelect}></GroupRow>
							<GroupRow id="engsl" checked={checked} name="English A: Language and Literature SL" onSelect={onSelect}></GroupRow>
						</div>
						<div className={styles.group}>
							<div className={styles.title}>Group 2: Language Acquisition</div>
							<GroupRow id="frhl" checked={checked} name="French B: HL" onSelect={onSelect} extra="For French Immersion Students"></GroupRow>
							<GroupRow id="frsl" checked={checked} name="French B: SL" onSelect={onSelect} extra="Must have prior experience learning French"></GroupRow>
							<GroupRow id="na" checked={checked} name="Chinese B: SL" onSelect={onSelect} extra="Must pass Mandarin entrance exam"></GroupRow>
							<GroupRow
								id="spanabi"
								checked={checked}
								name="Spanish Ab Initio: SL"
								onSelect={onSelect}
								extra="Students with no prior experience in Spanish"
							></GroupRow>
							<GroupRow id="na" checked={checked} name="Lang A Self-Study: SL" onSelect={onSelect} extra="Must be fluent in chosen language"></GroupRow>
							<div className={styles.groupRow}>
								<div className={styles.groupLeft}>Self-Study Language:</div>
							</div>
						</div>
						<div className={styles.group}>
							<div className={styles.title}>Group 3: Individuals and Societies</div>
							<GroupRow id="psychhl" checked={checked} name="Psychology: HL" onSelect={onSelect}></GroupRow>
							<GroupRow id="psychsl" checked={checked} name="Psychology: SL" onSelect={onSelect}></GroupRow>
							<GroupRow id="glopohl" checked={checked} name="Global Politics: HL" onSelect={onSelect}></GroupRow>
							<GroupRow id="gloposl" checked={checked} name="Global Politics: SL" onSelect={onSelect}></GroupRow>
							<GroupRow id="na" checked={checked} name="Environmental Systems and Societies: HL" onSelect={onSelect}></GroupRow>
							<GroupRow id="na" checked={checked} name="Environmental Systems and Societies: SL" onSelect={onSelect}></GroupRow>
						</div>
					</section>
					<section>
						<div className={styles.group}>
							<div className={styles.title}>Group 4: Sciences</div>
							<GroupRow id="biohl" checked={checked} name="Biology: HL" onSelect={onSelect}></GroupRow>
							<GroupRow id="biosl" checked={checked} name="Biology: SL" onSelect={onSelect}></GroupRow>
							<GroupRow id="chemhl" checked={checked} name="Chemistry: HL" onSelect={onSelect}></GroupRow>
							<GroupRow id="chemsl" checked={checked} name="Chemistry: SL" onSelect={onSelect}></GroupRow>
							<GroupRow id="physhl" checked={checked} name="Physics: HL" onSelect={onSelect} extra="Physics 11 Pre-Requisite"></GroupRow>
							<GroupRow id="physsl" checked={checked} name="Physics: SL" onSelect={onSelect} extra="Physics 11 Pre-Requisite"></GroupRow>
							<GroupRow id="na" checked={checked} name="Environmental Systems and Societies: HL" onSelect={onSelect}></GroupRow>
							<GroupRow id="na" checked={checked} name="Environmental Systems and Societies: SL" onSelect={onSelect}></GroupRow>
						</div>
						<div className={styles.group}>
							<div className={styles.title}>Group 5: Math</div>
							<GroupRow id="aahl" checked={checked} name="Analysis and Approaches: HL" onSelect={onSelect} extra="Pre-Calculus 11 Pre-Requisite"></GroupRow>
							<GroupRow id="aasl" checked={checked} name="Analysis and Approaches: SL" onSelect={onSelect} extra="Pre-Calculus 11 Pre-Requisite"></GroupRow>
							<GroupRow id="aihl" checked={checked} name="Applications and Interpretations: HL" onSelect={onSelect} extra="Pre-Calculus 11 Pre-Requisite"></GroupRow>
							<GroupRow id="aisl" checked={checked} name="Applications and Interpretations: SL" onSelect={onSelect} extra="NO Pre-Requisite"></GroupRow>
						</div>
						<div className={styles.group}>
							<div className={styles.title}>Group 6 (Optional): Arts</div>
							<GroupRow id="na" checked={checked} name="Visual Arts: SL" onSelect={onSelect}></GroupRow>
						</div>
					</section>
				</article>
				<button onClick={onSubmit} className="maxButton">
					Submit
				</button>
			</div>
		</main>
	);
};
