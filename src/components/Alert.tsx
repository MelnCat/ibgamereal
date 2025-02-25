import styles from "./Alert.module.scss";

export const Alert = ({ title, details, icon }: { title: string; details: string; icon: string }) => {
	return <div className={styles.alert}>
		<div className={styles.alertImage}>{icon}</div>
		<div className={styles.alertInfo}>
			<h1>{title}</h1>
			<p>{details}</p>
		</div>
	</div>
};
