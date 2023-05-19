import chalk from "chalk";
import { existsPath } from "./funciones/validarExistencia.js";
import { resolvePath } from "./funciones/convertirRuta.js";
import { leerArchivo } from "./funciones/leerArchivo.js";
import { directory } from "./funciones/leerDirectorio.js";
//path.isAbsolute()método determina si pathes una ruta absoluta. path.isAbsolute('/foo/bar'); // true}
// path.dirname()método devuelve el nombre del directorio de un path
// El path.extname()método devuelve la extensión de path
//resolve() El método resolverá la ruta relativa proporcionada en una ruta absoluta

const ruta = './test/ejemplo.md'

// revizar process.argv
const mdLinks = (path) => {
  return new Promise((resolve, reject) => {
    if (!existsPath(path)) {
      reject(chalk.red("ruta no existe"));
      return;
    }

    //ruta absoluta
    const rutaAbsoluta = resolvePath(path)
    console.log('rutaAbsoluta: ', rutaAbsoluta);

    //buscar directorio
    if (!directory(rutaAbsoluta)) {
      console.log("directorio no existe entonces a leer archivo");
     
      // leer archivo   resuelve links
      leerArchivo(rutaAbsoluta).then((links) => {
       // console.log('linksssss: ', links);
       // recorrer links for, map, forEach (crear funcion que reciba links/array y haga todo)
       // por cada href hacer la peticon http fetch, axios, node:http
       // con la respuesta de la peticion sumas a tu objeto {status: 500, statustex:'ok|| fail'}
        resolve(links)
      });
      return;
    }
    //Averigua la extensión de un archivo
    //extname()
  })
}
mdLinks(ruta).then((response)=>{
  console.log('response ', response);
})
