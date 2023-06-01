import chalk from "chalk";
import { existsPath } from "./funciones/validarExistencia.js";
import { resolvePath } from "./funciones/convertirRuta.js";
import { leerArchivo } from "./funciones/leerArchivo.js";
import { directory } from "./funciones/leerDirectorio.js";
import { archivoMD } from "./funciones/validarArchivoMD.js";
import { validateLinks } from "./funciones/validarLinks.js";
import { validateStats } from "./funciones/validarStats.js";
import { getStats } from "./funciones/estadisticas.js";
//path.isAbsolute()método determina si pathes una ruta absoluta. path.isAbsolute('/foo/bar'); // true}
// path.dirname()método devuelve el nombre del directorio de un path
// El path.extname()método devuelve la extensión de path
//resolve() El método resolverá la ruta relativa proporcionada en una ruta absoluta

const ruta = './test/ejemplo.md'

// revizar process.argv
export const mdLinks = (path, option) => {
  return new Promise((resolve, reject) => {
    if (!existsPath(path)) {
      reject(chalk.red("ruta no existe"));
      return;
    }

    //ruta absoluta
    const rutaAbsoluta = resolvePath(path)

    //buscar directorio
    if (!directory(rutaAbsoluta)) {
      console.log("directorio no existe entonces a leer archivo");

      if (!archivoMD(rutaAbsoluta)) {
        reject(chalk.red("No se encontraron archivos MD que analizar"));
        return
      }

      // leer archivo   resuelve links
      leerArchivo(rutaAbsoluta)
        .then((links) => {
          if (option.validate) {
            console.log('option.validate');
            // return validateLinks(links)
            validateLinks(links).then((data) => {
              // return data
              resolve(data);
            })
            return
          }
          if (option.stats && option.validate) {
            console.log('stats && validate');
            // resolve (validateStats(links));
            console.log('validateStats(links):   ', validateStats(links));
             return validateStats(links);
            /* const output = validateStats(links);
            resolve(output); */
            /* validateStats(links).then((stats) => {
              // return data
              resolve(stats);
            }) */
            //return
          }
          
          
          if (option.stats) {
            console.log('option.stats ');
            //se obtiene estadisticas
            resolve(getStats(links));
          }
          //resolve(links);
          // return resolve(results);         
          console.log('solo ruta');
          //return links
          resolve(links);
        })
        .catch((error) => reject(error));
      /// contar caracteres
    }
  })
}
/* mdLinks(ruta, { validate:true, stats: true}).then((response) => {
  console.log('response ', response);
}) */
