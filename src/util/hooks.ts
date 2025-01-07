import { useLocalStorage } from "usehooks-ts";

export const usePage = () => useLocalStorage("page", "main")