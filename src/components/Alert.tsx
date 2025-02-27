import { useAlerts } from "../util/hooks";
import styles from "./Alert.module.scss";

export const Alert = ({ title, details, icon, id }: { title: string; details: string; icon: string; id: number }) => {
	const alertContext = useAlerts();
	return (
		<div className={styles.alert}>
			<div className={styles.alertImage}>{icon}</div>
			<div className={styles.alertInfo}>
				<h1>{title}</h1>
				<p>{details}</p>
			</div>
			<div className={styles.closeContainer}>
				<button
					className={styles.close}
					onClick={() => {
						alertContext.setAlerts(x => x.filter(y => y.id !== id));
					}}
				>
					X
				</button>
			</div>
		</div>
	);
};
