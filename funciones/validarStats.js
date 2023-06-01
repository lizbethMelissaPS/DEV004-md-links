import { contarEnlacesRotos } from "./linkRotos.js";
import { contarEnlacesUnicos } from "./linksUnicos.js";
/* export const validateStats = (links) => {
  console.log('validateStats : ');

    const total = links.length;
    const unique = contarEnlacesUnicos(links);
    const broken = contarEnlacesRotos(links);
    return {total: total, unique: unique , broken:broken};
  }; */

  export const validateStats = (links) => {
  console.log('validateStats : ');

    const total = links.length;
    const unique = contarEnlacesUnicos(links);
    const broken = contarEnlacesRotos(links);
    return {total: total, unique: unique , broken:broken};
  };