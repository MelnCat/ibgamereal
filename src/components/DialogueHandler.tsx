import { ReactNode, useMemo, useState } from "react";
import styles from "./DialogueHandler.module.scss";
import { useDialogue, useModals } from "../util/hooks";
import GraphemeSplitter from "grapheme-splitter";
import { useInterval } from "usehooks-ts";

const splitter = new GraphemeSplitter();

export const DialogueHandler = () => {
	const { dialogue, nextDialogue } = useDialogue();
	const last = useMemo(() => dialogue[0], [dialogue]);
	const graphemes = useMemo(() => last && splitter.splitGraphemes(last.dialogue.text), [last]);
	const [index, setIndex] = useState(0);
	useInterval(() => {
		if (index < graphemes.length) setIndex(x => x + 1);
	}, 20)
	return (
		<div className={styles.dialogueContainer} {...(dialogue.length > 0 ? { "data-active": true } : null)}>
			{last && (
				<div className={styles.dialogueBox}>
					{last.dialogue.name && <div className={styles.name}>{last.dialogue.name}</div>}
					{last.dialogue.image && <img className={styles.image} src={last.dialogue.image} />}
					<div className={styles.details}>{graphemes.slice(0, index).join("")}</div>
					<div className={styles.buttons}>
						<button onClick={() => {
							nextDialogue()
							setIndex(0);
						}}>Next</button>
					</div>
				</div>
			)}
		</div>
	);
};
