import { mdLinks } from "../index";
import { existsPath } from "../funciones/validarExistencia";
import { resolvePath } from "../funciones/convertirRuta";

describe('determinarExistencia', () => {
  it('esfunction', () => {
    expect(typeof existsPath).toEqual('function');
  });
  it('deberia retornar que no existe', () => {
    const ruta = 'ejemplo.m';
    const existe = existsPath(ruta)
    expect(existe).toEqual(false) 
  })

  it('deberia retornar que si existe', () => {
    const ruta = 'ejemplo.md';
    expect(existsPath(ruta)).toEqual(true)
  })
})

describe('convertirRuta', () => {
  it('es function', () => {
    expect(typeof resolvePath).toBe('function');
  });
 
  it('deberia retornar que ruta absoluta', () => {
    const ruta = 'ejemplo.md';
    expect(resolvePath(ruta)).toEqual('C:\\Users\\Kewin\\Desktop\\laboratoria\\mdlink\\DEV004-md-links\\ejemplo.md')
  })


})
describe('mdLinks', () => {
  it('Is a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('mdLinks procesa un solo archivo con 3 links sin validar', () => {
    const ruta = 'ejemplo.md';
    const array = mdLinks(ruta, { valida: false })
      .the(
        (array) => {
          expect(array).toEqual([
            {
              href: 'https://es.wikipedia.org/wiki/Markdown',
              text: 'Markdown',
              file: 'ejemplo.md',
            },
            {
              href: 'https://nodejs.org/es/',
              text: 'Node.js',
              file: 'ejemplo.md',
            },
            {
              href: 'https://developers.google.com/v8/)',
              text: 'motor de JavaScript V8 de Chrome',
              file: 'ejemplo.md',
            }
          ])
        }
      )
  });

});
