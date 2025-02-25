import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export const usePage = () => useLocalStorage("page", "main");

export const useGameStage = () => useLocalStorage("gameStage", "home");

export interface GameData {
	courses: string[];
}

export const useOptionalGameData = () => useLocalStorage("gameData", null as GameData | null);
export const useGameData = () => {
	const [data, setData] = useOptionalGameData();
	const [page, setPage] = usePage();
	if (data == null) setPage("main");
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
	const [time, setTime] = useLocalStorage("time", 0);
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

export const useModals = () => useContext(ModalContext);
export const useAlerts = () => useContext(AlertContext);
