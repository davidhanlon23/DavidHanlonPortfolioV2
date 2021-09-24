import { writable } from 'svelte/store'
export const storeFE = writable({})
export const isDarkMode = writable(false);
const storedTheme = localStorage.getItem("theme");
export const theme = writable(storedTheme);
theme.subscribe(value => {
    localStorage.setItem("theme", value === 'dark' ? 'dark' : 'light');
});

