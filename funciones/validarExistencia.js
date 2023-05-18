import { existsSync} from "fs";
//validar existencia de path
export const existsPath  = (path) => existsSync(path);