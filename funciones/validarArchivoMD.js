import { extname } from "path";

export const archivoMD = (path) => {
  if (extname(path) === ('.md')) return true;
  return false;
};