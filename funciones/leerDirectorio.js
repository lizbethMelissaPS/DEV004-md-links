import { statSync} from "fs";
/* recurcividad
promise.all resolver todas la promesas */

// verifica si es un directorio
export const directory = (path) => statSync(path).isDirectory();
