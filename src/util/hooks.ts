import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export const usePage = () => useLocalStorage("page", "main");

export const useGameStage = () => useLocalStorage("gameStage", "home");
export const useGamePhase = () => useLocalStorage("gamePhase", "am");
export const useGameFlags = () => useLocalStorage("gameFlags", [] as string[])
export const useGameTime = () => useLocalStorage("gameTime", { month: "fall", date: 1, day: 1, block: "-" })
export interface GameData {
	courses: string[];
	schedule: [
		[string, string, string, string],
		[string, string, string, string],
	],
	grades: Record<string, number>;
}

export const useOptionalGameData = () => useLocalStorage("gameData", null as GameData | null);
export const useGameData = () => {
	const [data, setData] = useOptionalGameData();
	const [page, setPage] = usePage();
	if (data == null) setPage("main");
	return data!;
};
export interface Homework {
	id: number;
	course: string;
	type: string;
}
export const useHomework = () => {
	return useState([
		{
			id: Math.random(),
			course: "aahl",
			type: "add",
		},
		{
			id: Math.random(),
			course: "aahl",
			type: "add",
		},
		{
			id: Math.random(),
			course: "aahl",
			type: "add",
		},
		{
			id: Math.random(),
			course: "aahl",
			type: "add",
		},
		{
			id: Math.random(),
			course: "aahl",
			type: "add",
		},
		{
			id: Math.random(),
			course: "aahl",
			type: "add",
		},
		{
			id: Math.random(),
			course: "aahl",
			type: "add",
		},
		{
			id: Math.random(),
			course: "aahl",
			type: "add",
		},
		{
			id: Math.random(),
			course: "aahl",
			type: "add",
		},
		{
			id: Math.random(),
			course: "aahl",
			type: "add",
		},
		{
			id: Math.random(),
			course: "aahl",
			type: "add",
		},
		{
			id: Math.random(),
			course: "enghl",
			type: "readBook",
		},
	]);
};

export interface Stats {
	health: number;
	mentalHealth: number;
	energy: number;
}

export const useStats = () =>
	useLocalStorage("stats", {
		health: 100,
		mentalHealth: 100,
		energy: 100,
	});

export const useBgm = (value?: string) => {
	const [bgm, setBgm] = useLocalStorage("bgm", "");
	useEffect(() => {
		if (value !== undefined) setBgm(value);
	}, [setBgm, value]);
	return [bgm, setBgm] as const;
};
export const useTime = () => {
	const [time, setTime] = useLocalStorage("time", 6 * 60);
	return [time, Math.floor(time / 60), time % 60, setTime] as const;
};

export const ModalContext = createContext<{ modals: { id: number; element: ReactNode }[]; setModals: Dispatch<SetStateAction<{ id: number; element: ReactNode }[]>> }>({
	modals: [],
	setModals() {},
});
export const AlertContext = createContext<{ alerts: { id: number; element: ReactNode }[]; setAlerts: Dispatch<SetStateAction<{ id: number; element: ReactNode }[]>> }>({
	alerts: [],
	setAlerts() {},
});

export const useModals = () => {
	const { modals, setModals } = useContext(ModalContext);
	return {
		modals,
		setModals,
		addModal(modal: (id: number) => ReactNode) {
			const id = Math.random();
			setModals(x => x.concat({ id, element: modal(id) }));
		},
		removeModal(id: number) {
			setModals(x => x.filter(y => y.id !== id));
		},
	};
};
export const useAlerts = () => {
	const { alerts, setAlerts } = useContext(AlertContext);
	return {
		alerts,
		setAlerts,
		addAlert(alert: (id: number) => ReactNode, timeout: number | null = null) {
			const id = Math.random();
			setAlerts(x => x.concat({ id, element: alert(id) }));
			if (timeout) setTimeout(() => setAlerts(x => x.filter(y => y.id !== id)), timeout);
		},
		removeAlert(id: number) {
			setAlerts(x => x.filter(y => y.id !== id));
		},
	};
};
export interface Dialogue {
	image?: string;
	name?: string;
	text: string;
}