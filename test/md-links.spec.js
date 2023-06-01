import chalk from "chalk";
import { mdLinks } from "../index";
import { existsPath } from "../funciones/validarExistencia";
import { archivoMD } from "../funciones/validarArchivoMD";
import { leerArchivo } from "../funciones/leerArchivo"; 
import { resolvePath } from "../funciones/convertirRuta";


describe('determinarExistencia', () => {
  it('deberia retornar que no existe', () => {
    const ruta = 'ejemplo.m';
    const existe = existsPath(ruta)
    expect(existe).toEqual(false)
  })

  it('deberia retornar que si existe', () => {
    const ruta = './test/ejemplo.md';
    expect(existsPath(ruta)).toEqual(true)
  })
})

describe('convertirRuta', () => {
  it('es function', () => {
    expect(typeof resolvePath).toBe('function');
  });

  it('deberia retornar ruta relativa a absoluta', () => {
    const ruta = 'ejemplo.md';
    expect(resolvePath(ruta)).toEqual('C:\\Users\\Kewin\\Desktop\\laboratoria\\mdlink\\DEV004-md-links\\ejemplo.md')
  });
  it('deberia retornar ruta absoluta', () => {
    const ruta = '/Users/kewin/laboratoria/mdlink/DEV004-md-links/';
    expect(resolvePath(ruta)).toBe('/Users/kewin/laboratoria/mdlink/DEV004-md-links/')
  })


})

describe('estadisticas', () => {
  it('should return total and unique', () => {
    const expected = { "total": 4, "unique": 4 }
    return expect(mdLinks('./test/ejemplo.md', { stats: true })).resolves.toStrictEqual(expected)
  })
})

describe('validarArchivoMD', () => {
  it('return true si el archivo no es .md', () => {
    expect(archivoMD('./test/ejemplo.md')).toBe(true)
  });

  it('return false si el archivo no es .md', () => {
    expect(archivoMD('./test/md-links.spec.js')).toBe(false)
  });
});

describe('link', () => {
  it('xxxxxxxxxxxx', () => {
    const output = { total: 3, unique: 3, broken: 2 };
    return mdLinks('./test/ejemplo2.md', { stats: true, validate: true }).then((results) => {
      expect(results).toEqual(output);
    });
  },10000)
});

describe('leerArchivo', () => {
  it("should reject when a file can't be read", () => {
    return leerArchivo("./tesht/ejemplo3.md").catch((error) => {
      expect(error).toContain("ENOENT: no such file or directory, open 'C:\\Users\\Kewin\\Desktop\\laboratoria\\mdlink\\DEV004-md-links\\tesht\\ejemplo3.md'");
    });
  });

  


});


describe('mdLinks', () => {
  it("No se encontraron archivos MD", () => {
    return mdLinks("./cli.js").catch((error) => {
      expect(error).toBe(chalk.red("No se encontraron archivos MD que analizar"));
    });
  });


  it(" ruta no existe", () => {
    return mdLinks("./test/ejemplo.m").catch((error) => {
      expect(error).toBe(chalk.red("ruta no existe"));
    });
  });

  it('Is a function', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('mdLinks procesa un solo archivo con 3 links sin validar', () => {
    const ruta = './test/ejemplo.md';
    return mdLinks(ruta, { validate: true })
      .then((array) => {
        expect(array).toEqual([
          {
            href: 'https://es.wikipedia.org/wiki/Markdown',
            text: 'Markdown',
            file: 'C:\\Users\\Kewin\\Desktop\\laboratoria\\mdlink\\DEV004-md-links\\test\\ejemplo.md',
            status: 200,
            message: 'OK'
          },
          {
            href: 'https://nodejs.org/es/',
            text: 'Node.js',
            file: 'C:\\Users\\Kewin\\Desktop\\laboratoria\\mdlink\\DEV004-md-links\\test\\ejemplo.md',
            status: 200,
            message: 'OK'
          },
          {
            href: 'https://developers.google.com/v8/',
            text: 'motor de JavaScript V8 de Chrome',
            file: 'C:\\Users\\Kewin\\Desktop\\laboratoria\\mdlink\\DEV004-md-links\\test\\ejemplo.md',
            status: 200,
            message: 'OK'
          },
          {
            href: 'https://www.helpmycash.com/cuentas/cu/',
            text: 'ROTO',
            file: 'C:\\Users\\Kewin\\Desktop\\laboratoria\\mdlink\\DEV004-md-links\\test\\ejemplo.md',
            status: 404,
            message: 'Not Found'
          }
        ])
      }
      )
      .catch(() => {
        expect().toEqual([
          {
           status: '404',
            message: 'fail'
          }
        ])

      }
      )


  });
})
