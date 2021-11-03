import { writable } from 'svelte/store'
export const storeFE = writable({})
export const isDarkMode = writable(false);
const storedTheme = typeof window !== 'undefined' ? localStorage.getItem("theme") : 'light';
export const theme = writable(storedTheme);
if(typeof window !== 'undefined'){
    theme.subscribe(value => {
        localStorage.setItem("theme", value === 'dark' ? 'dark' : 'light');
    });
    
}

export const user = writable({
    name: "",
    email: "",
    message: ""
  })