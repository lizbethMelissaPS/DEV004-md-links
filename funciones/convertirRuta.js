import { isAbsolute, resolve } from "path";
//convertir ruta relativa a absoluta
export const resolvePath = (path) => {
    return isAbsolute(path) ? path : resolve(path)
}