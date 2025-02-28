import { useEffect } from "react";
import styles from "./school.module.scss";
import { useDialogue, useRunOnce } from "../../util/hooks";

export const School = () => {
	const d = useDialogue();
	useRunOnce(() => {
		d.addDialogue({ name: "Max", text: "Hello everyone. I am Max, the IB coordinator and also the teacher for this class." });
		d.addDialogue({ name: "Max", text: "I know you are new to this class, and that's why I will be very harsh on you." });
	});
	return (
		<>
			<img className={styles.background} src="/img/schoolBack.png" />
			<img className={styles.teacher} src="/img/max.png" />
			<img className={styles.background} style={{ backgroundColor: "unset", zIndex: 1 }} src="/img/schoolFront.png" />
		</>
	);
};
