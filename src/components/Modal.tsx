import { ReactNode } from "react";
import styles from "./Modal.module.scss";
import { useModals } from "../util/hooks";

export const Modal = ({ id, title, children, scaleX = 1, scaleY = 1 }: { id: number; title: string; children?: ReactNode; scaleX?: number, scaleY?: number }) => {
	const { modals, setModals } = useModals();
	return (
		<div className={styles.modal} style={{ "--scaleX": scaleX, "--scaleY": scaleY }}>
			<div className={styles.modalBar}>
				<div className={styles.title}>{title}</div>
				<button className={styles.closeButton} onClick={() => {
					setModals(x => x.filter(y => y.id !== id))
				}}>
					X
				</button>
			</div>
			<div className={styles.modalContents}>{children}</div>
		</div>
	);
};
