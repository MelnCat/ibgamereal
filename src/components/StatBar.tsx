import styles from "./StatBar.module.scss";

export const StatBar = ({ value, color, border, name, icon }: { value: number; color: string; border: string; name: string; icon: string }) => {
	return (
		<div className={styles.stat}>
			<div
				className={styles.statBar}
				style={{ backgroundImage: `linear-gradient(90deg, ${color}, ${color} ${value}%, transparent ${value}%, transparent)`, border: `2px solid ${border}` }}
			>
				<img src={icon} className={styles.statImage} />
				{name}
			</div>
			<span>{value}/100</span>
		</div>
	);
};
