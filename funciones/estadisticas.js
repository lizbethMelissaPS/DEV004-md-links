import { contarEnlacesUnicos } from "./linksUnicos.js";
export const getStats = (links) => {
    const total = links.length;
    const unique = contarEnlacesUnicos(links);    
    return { total: total, unique: unique };
};