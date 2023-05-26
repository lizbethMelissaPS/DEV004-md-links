import chalk from "chalk";
import { existsPath } from "./funciones/validarExistencia.js";
import { resolvePath } from "./funciones/convertirRuta.js";
import { leerArchivo } from "./funciones/leerArchivo.js";
import { directory } from "./funciones/leerDirectorio.js";
import { archivoMD } from "./funciones/validarArchivoMD.js";
import { validateLinks } from "./funciones/validarLinks.js";
//path.isAbsolute()método determina si pathes una ruta absoluta. path.isAbsolute('/foo/bar'); // true}
// path.dirname()método devuelve el nombre del directorio de un path
// El path.extname()método devuelve la extensión de path
//resolve() El método resolverá la ruta relativa proporcionada en una ruta absoluta

const ruta = './test/ejemplo.md'

// revizar process.argv
const mdLinks = (path, option) => {
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

      //validad antes si es archivo md
      if (!archivoMD(rutaAbsoluta)) {
        console.log(errorChalk('No se encontraron archivos MD que analizar'));
        return
      }
      
      // leer archivo   resuelve links
      leerArchivo(rutaAbsoluta)
        .then((links) => {
          if (option) {
            console.log('yyyyyyyy');
            validateLinks(links).then((data) => {
              // return data
              resolve(data);
            })
            return
          }
          console.log('xxxxxxx');
          //return links
          resolve(links);
        })
        /* .then((x) => {
          if (condition) {

          } else {

          }
          return resolve(x)
        }) */
        .catch((error) => reject(error));
    }
  })
}
mdLinks(ruta, { validate: true }).then((response) => {
  console.log('response ', response);
})
