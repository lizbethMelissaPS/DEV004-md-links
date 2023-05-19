import { readFile } from "fs";
import { getLink } from "./extraerLinks.js";
//readFile() asíncrono- Este método accede a un fichero para su lectura y nos entrega el contenido en forma de buffer o en forma de cadena.
//readFile(archivo [, options], callback)

export function leerArchivo(path) {
  return new Promise((resolve, reject) => {
    readFile(path, 'utf-8', (err, data) => {
      if(err) {
        console.log('error: ', err);
        const messageError = err.message;
        reject(messageError);
        return
      } 
        console.log('extraer links: ');
        const links = getLink(data, path);
        resolve(links);
    });
  });
}