#!/usr/bin/env node

// para indicar que usamos este archivo como un script cli
import chalk from "chalk";
import { mdLinks } from "./index.js";
import { argv } from "process";
import { validateStats } from "./funciones/validarStats.js";

// process.argv se utiliza para pasar los argumentos al proceso node.js cuando se ejecuta en la línea de comandos.
const args = argv.slice(2);
const path = args[0];
// Verificar las opciones pasadas en la línea de comandos
const option = {
  validate: args.includes("--validate"),
  stats: args.includes("--stats"),
};

if (args.includes("--help")) {
  console.log(" option: ");
  console.log("--validate   Muestra el estatus de cada link.");
  console.log("--stats      Muestra las estadisticas de cada link.");
  console.log("--help       Muestra las instrucciones de uso de la herramienta.");
} else {
  mdLinks(path, option)
    .then((results) => {
      if (option.stats && option.validate) {
        const res = validateStats(results);
        const statsValidateText = `
      ${chalk.bgBlue.white(" Total ")}: ${res.total}\n
      ${chalk.bgGreen.white(" Unique ")}: ${res.unique}\n
      ${chalk.bgRed.white(" Broken ")}: ${res.broken}
      `;
        console.log(statsValidateText);
        return
      } //else 
      if (option.stats) {
        const stats = `
      ${chalk.bgBlue.white(" Total ")}: ${results.total}\n
      ${chalk.bgGreen.white(" Unique ")}: ${results.unique}\n
      `;
        console.log(stats);
      } else 
      {
        results.forEach((link) => {
          let validate = `${chalk.grey.bold(link.file)} ${chalk.cyan(link.href)} ${chalk.white(link.text)} `;
          if (option.validate) {
            validate += ` ${
              link.message === "OK"
                ? chalk.bgGreen.bold(" OK ")
                : chalk.bgRed.bold(" FAIL ")
            }`;
            validate += ` ${chalk.yellow(link.status)} `;
          }
          if (link.text.length > 50) {
            validate += ` 
            ${chalk.gray(link.text.slice(0, 50) + "...")}\n
            ${chalk.bgGreen.white(link.href)}: ${link.unique}`;
          }
          console.log(validate);
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
