import styles from "./school.module.scss";

export const School = () => {
	return (
		<>
			<img className={styles.background} src="/img/schoolBack.png" />
			<img className={styles.background} style={{ backgroundColor: "unset" }} src="/img/schoolFront.png" />
		</>
	);
};
