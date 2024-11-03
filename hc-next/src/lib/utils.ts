import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

axios.defaults.headers.get["Access-Control-Allow-Origin"]="*"
axios.defaults.headers.get["Access-Control-Allow-Methods"]="DELETE, POST, GET, OPTIONS"
axios.defaults.headers.get["Access-Control-Allow-Headers"]="Content-Type, Authorization, X-Requested-With"
